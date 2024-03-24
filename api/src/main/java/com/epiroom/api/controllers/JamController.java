package com.epiroom.api.controllers;


import com.epiroom.api.model.LogTime;
import com.epiroom.api.model.Promotion;
import com.epiroom.api.model.User;
import com.epiroom.api.model.dto.PostIntraData;
import com.epiroom.api.model.dto.SimpleLogTime;
import com.epiroom.api.repository.LogTimeRepository;
import com.epiroom.api.repository.PromotionRepository;
import com.epiroom.api.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.*;
import java.util.Date;
import java.util.List;

@Tag(name = "JAM", description = "Jam API")
@CrossOrigin(origins = "*")
@RestController
public class JamController {
    private final LogTimeRepository logTimeRepository;
    private final UserRepository userRepository;
    private final PromotionRepository promotionRepository;

    public JamController(LogTimeRepository logTimeRepository, UserRepository userRepository, PromotionRepository promotionRepository) {
        this.logTimeRepository = logTimeRepository;
        this.userRepository = userRepository;
        this.promotionRepository = promotionRepository;
    }
    @GetMapping("/day")
    @Operation(summary = "Get timelog for a day", parameters = {
            @Parameter(name = "timestamp", description = "Timestamp", required = true)
    })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Day found", content = {
                    @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = SimpleLogTime.class))
                    )
            })
    })
    public ResponseEntity<List<SimpleLogTime>> getActivities(@RequestParam(name = "timestamp") long timestamp) {
        LocalDateTime start = LocalDateTime.ofEpochSecond(timestamp, 0, ZoneOffset.UTC);
        start = start.withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime end = start.withHour(23).withMinute(59).withSecond(59).withNano(0);
        List<LogTime> logTimes = logTimeRepository.findByDateBetween(Date.from(start.toInstant(ZoneOffset.UTC)), Date.from(end.toInstant(ZoneOffset.UTC)));
        return ResponseEntity.ok(logTimes.stream().map(SimpleLogTime::new).toList());
    }

    @PostMapping("/log")
    @Operation(summary = "Log time", requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(content = @Content(schema = @Schema(implementation = PostIntraData.class))))
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Time logged", content = @Content),
            @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content)
    })
    public ResponseEntity<Void> logTime(@RequestBody PostIntraData data) {
        Promotion promotion = promotionRepository.findByYear(data.getPromotion());
        if (promotion == null) {
            promotion = new Promotion(data.getPromotion());
            promotionRepository.save(promotion);
        }
        User user = userRepository.findByMail(data.getMail());
        if (user == null) {
            user = new User(data.getMail(), promotion.getId());
            userRepository.save(user);
        }
        data.getLogTimes().forEach(logTime -> {
            Date date = Date.from(Instant.ofEpochSecond(logTime.getTimestamp()));
            LogTime existingLogTime = logTimeRepository.findByMailAndDate(data.getMail(), date);
            if (existingLogTime != null) {
                return;
            }
            LogTime logTimeObj = new LogTime(data.getMail(), date, logTime.getDuration());
            logTimeRepository.save(logTimeObj);
        });
        return ResponseEntity.ok().build();
    }
}
