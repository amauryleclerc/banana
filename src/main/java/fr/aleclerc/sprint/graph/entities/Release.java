package fr.aleclerc.sprint.graph.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.UUID;

@Entity
public class Release {
    @Id
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @GeneratedValue(generator = "uuid")
    private UUID id;
    @Column(unique=true)
    @NotNull
    private String name;
    @Column
    private Instant start;
    @Column
    private Instant end;
    @Column
    private Float complexity;
    @Column
    private Float businessValue;
    @ManyToOne
    private Project project;

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

    public Float getComplexity() {
        return complexity;
    }

    public void setComplexity(Float complexity) {
        this.complexity = complexity;
    }

    public Float getBusinessValue() {
        return businessValue;
    }

    public void setBusinessValue(Float businessValue) {
        this.businessValue = businessValue;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Release release = (Release) o;

        if (id != null ? !id.equals(release.id) : release.id != null) return false;
        if (name != null ? !name.equals(release.name) : release.name != null) return false;
        if (start != null ? !start.equals(release.start) : release.start != null) return false;
        if (end != null ? !end.equals(release.end) : release.end != null) return false;
        if (complexity != null ? !complexity.equals(release.complexity) : release.complexity != null) return false;
        if (businessValue != null ? !businessValue.equals(release.businessValue) : release.businessValue != null)
            return false;
        return project != null ? project.equals(release.project) : release.project == null;

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (start != null ? start.hashCode() : 0);
        result = 31 * result + (end != null ? end.hashCode() : 0);
        result = 31 * result + (complexity != null ? complexity.hashCode() : 0);
        result = 31 * result + (businessValue != null ? businessValue.hashCode() : 0);
        result = 31 * result + (project != null ? project.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Release{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", start=" + start +
                ", end=" + end +
                ", complexity=" + complexity +
                ", businessValue=" + businessValue +
                ", project=" + project +
                '}';
    }
}
