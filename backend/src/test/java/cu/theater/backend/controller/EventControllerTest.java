package cu.theater.backend.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import cu.theater.backend.dto.event.EventRequestDto;
import cu.theater.backend.dto.event.EventResponseDto;
import cu.theater.backend.model.Event;
import java.math.BigDecimal;
import java.sql.Connection;
import java.util.List;
import javax.sql.DataSource;
import lombok.SneakyThrows;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EventControllerTest {
    protected static MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeAll
    static void beforeAll(
            @Autowired WebApplicationContext applicationContext) {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(applicationContext)
                .apply(springSecurity())
                .build();
    }

    @AfterAll
    static void afterAll(@Autowired DataSource dataSource) {
        teardown(dataSource);
    }

    @SneakyThrows
    static void teardown(DataSource dataSource) {
        try (Connection connection = dataSource.getConnection()) {
            connection.setAutoCommit(true);
            ScriptUtils.executeSqlScript(connection,
                    new ClassPathResource("database/after/after_afterTestExecution.sql")
            );
        }
    }

    @Test
    @WithUserDetails("test@mail.com")
    @DisplayName("Create client, valid request")
    @Sql(scripts = {
            "classpath:database/before/before_TestExecution.sql",
    }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = {
            "classpath:database/after/after_afterTestExecution.sql"
    }, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void createEvent_ValidRequest_Ok() throws Exception {
        //Given
        EventRequestDto createClientRequest = createEventRequest();

        String jsonRequest = objectMapper.writeValueAsString(createClientRequest);

        //When
        mockMvc.perform(
                        post("/events")
                                .content(jsonRequest)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isCreated());
    }

    @Test
    @WithUserDetails("test@mail.com")
    @DisplayName("Update event, valid request")
    @Sql(scripts = {
            "classpath:database/before/before_TestExecution.sql",
    }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = {
            "classpath:database/after/after_afterTestExecution.sql"
    }, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void updateEvent_ValidRequest_Ok() throws Exception {
        //Given
        Long id = 1L;
        String expectedEventName = "Test Event ONE - UPD";
        EventRequestDto createClientRequest = createEventRequest();
        createClientRequest.setName("Test Event ONE - UPD");
        String jsonRequest = objectMapper.writeValueAsString(createClientRequest);

        //When
        MvcResult mvcResult = mockMvc.perform(
                        put("/events/{id}", id)
                                .content(jsonRequest)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk()).andReturn();
        EventResponseDto actual = objectMapper.readValue(mvcResult.getResponse()
                .getContentAsString(), EventResponseDto.class);
        //Then
        assertNotNull(actual);
        assertEquals(expectedEventName, actual.getName());
    }

    @Test
    @WithUserDetails("test@mail.com")
    @DisplayName("Update event, invalid request")
    @Sql(scripts = {
            "classpath:database/before/before_TestExecution.sql",
    }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = {
            "classpath:database/after/after_afterTestExecution.sql"
    }, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void updateEvent_InValidRequest_NotOk() throws Exception {
        //Given
        Long id = 101L;
        EventRequestDto createClientRequest = createEventRequest();
        createClientRequest.setName("Test Event ONE - UPD");

        String jsonRequest = objectMapper.writeValueAsString(createClientRequest);

        //Then
        mockMvc.perform(
                        put("/events/{id}", id)
                                .content(jsonRequest)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isNotFound());
    }

    @Test
    @WithUserDetails("test@mail.com")
    @DisplayName("Get all events, valid request")
    @Sql(scripts = {
            "classpath:database/before/before_TestExecution.sql",
    }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = {
            "classpath:database/after/after_afterTestExecution.sql"
    }, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void getAllEvents_ValidRequest_Ok() throws Exception {
        //Given

        MvcResult result = mockMvc.perform(
                        get("/events")
                                .contentType(MediaType.APPLICATION_JSON)

                )
                .andExpect(status().isOk())
                .andReturn();

        List<EventResponseDto> actual = objectMapper.readValue(result
                .getResponse().getContentAsString(), new TypeReference<>() {
                });
        //Then
        assertNotNull(actual);
        assertEquals(2, actual.size());
    }

    @Test
    @WithUserDetails("test@mail.com")
    @DisplayName("Get event by id, valid request")
    @Sql(scripts = {
            "classpath:database/before/before_TestExecution.sql",
    }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = {
            "classpath:database/after/after_afterTestExecution.sql"
    }, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void getEventById_ValidRequest_Ok() throws Exception {
        //Given
        Long id = 1L;
        String expectedName = "Test Event ONE - UPD";

        //When
        MvcResult mvcResult = mockMvc.perform(
                        get("/events/{id}", id)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk()).andReturn();

        EventResponseDto actual = objectMapper.readValue(mvcResult.getResponse()
                .getContentAsString(), EventResponseDto.class);
        //Then
        assertNotNull(actual);
        assertEquals(expectedName, actual.getName());
    }

    @Test
    @WithUserDetails("test@mail.com")
    @DisplayName("Get event by id, invalid request")
    @Sql(scripts = {
            "classpath:database/before/before_TestExecution.sql",
    }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = {
            "classpath:database/after/after_afterTestExecution.sql"
    }, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void getEventById_inValidRequest_NotOk() throws Exception {
        //Given
        Long id = 101L;

        //When
        mockMvc.perform(
                        get("/events/{id}", id)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isNotFound());
    }

    @Test
    @WithUserDetails("test@mail.com")
    @DisplayName("Delete event, valid request")
    @Sql(scripts = {
            "classpath:database/before/before_TestExecution.sql",
    }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = {
            "classpath:database/after/after_afterTestExecution.sql"
    }, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void deleteEvent_ValidRequest_Ok() throws Exception {
        //Given
        Long id = 2L;
        //When
        mockMvc.perform(
                        delete("/events/{id}", id)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isNoContent())
                .andReturn();
    }

    @Test
    @WithUserDetails("test@mail.com")
    @DisplayName("Delete event, invalid request")
    @Sql(scripts = {
            "classpath:database/before/before_TestExecution.sql",
    }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = {
            "classpath:database/after/after_afterTestExecution.sql"
    }, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    public void deleteEvent_InValidRequest_NotOk() throws Exception {
        //Given
        Long id = 101L;
        //When
        mockMvc.perform(
                        delete("/events/{id}", id)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isNotFound());
    }

    private EventRequestDto createEventRequest() {
        return new EventRequestDto()
                .setName("Test Event")
                .setDescription("Test Description")
                .setPrice(BigDecimal.valueOf(100))
                .setStatus(Event.Status.ONGOING)
                .setPhotoUrl("Test Photo");
    }
}
