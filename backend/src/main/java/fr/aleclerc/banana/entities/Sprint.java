package fr.aleclerc.banana.entities;

import java.io.Serializable;
import java.time.Instant;
import java.time.Period;
import java.time.temporal.TemporalAmount;
import java.time.temporal.TemporalUnit;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Sprint implements Serializable {
    /**
     *
     */
    private static final long serialVersionUID = 6932159372480368455L;
    @Id
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @GeneratedValue(generator = "uuid")
    private UUID id;
    @NotNull
    private String name;
    @Column
    private String jiraId;
    @Column
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", timezone = "UTC")
    private Instant start;
    @Column
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", timezone = "UTC")
    private Instant end;

    @OneToMany(mappedBy = "sprint")
    private Set<StoryInSprint> stories = new HashSet<>();

    @ManyToOne
    private Release release;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getStart() {
        return start;
    }

    public void setStart(Instant start) {
        this.start = start;
    }

    public Instant getEnd() {
        return end;
    }

    public void setEnd(Instant end) {
        this.end = end;
    }

    public Set<StoryInSprint> getStories() {
        return stories;
    }

    public void setStories(Set<StoryInSprint> stories) {
        this.stories = stories;
    }

    public String getJiraId() {
        return jiraId;
    }

    public void setJiraId(String jiraId) {
        this.jiraId = jiraId;
    }

    public Release getRelease() {
        return release;
    }

    public void setRelease(Release release) {
        this.release = release;
    }

    public Float getBusinessValue() {
        return stories.stream()//
                .filter(Objects::nonNull)//
                .map(StoryInSprint::getStory)//
                .filter(Objects::nonNull)//
                .map(Story::getBusinessValue)//
                .filter(Objects::nonNull)//
                .reduce(0F, (acc, v) -> acc + v);
    }

    public Float getComplexity() {

        return stories.stream()//
                .filter(Objects::nonNull)//
                .map(StoryInSprint::getStory)//
                .filter(Objects::nonNull)//
                .map(Story::getComplexity)//
                .filter(Objects::nonNull)//
                .reduce(0F, (acc, v) ->acc + v);
    }

    public Float getEngagedComplexity() {
        return stories.stream()//
                .filter(Objects::nonNull)//
                .map(StoryInSprint::getStory)//
                .filter(Objects::nonNull)//
                .filter(s -> s.getComplexity() != null)//
                .filter(s -> s.getAddDate() != null)//
                .filter(s -> s.getAddDate().minus(Period.ofDays(1)).isBefore(this.start))//
                .map(Story::getComplexity)//
                .filter(Objects::nonNull)//
                .reduce(0F, (acc, v) ->  acc + v);
    }

    public Float getClosedComplexity() {
        return stories.stream()//
                .filter(Objects::nonNull)//
                .map(StoryInSprint::getStory)//
                .filter(Objects::nonNull)//
                .filter(s -> s.getComplexity() != null)//
                .filter(s -> s.getCloseDate() != null)//
                .filter(s -> s.getCloseDate().minus(Period.ofDays(1)).isBefore(this.end))//
                .map(Story::getComplexity)//
                .filter(Objects::nonNull)//
                .reduce(0f, (acc, v) ->    acc + v);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Sprint sprint = (Sprint) o;

        return id != null ? id.equals(sprint.id) : sprint.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    public void addStory(StoryInSprint storyInSprint) {
        this.stories.add(storyInSprint);
    }
}
