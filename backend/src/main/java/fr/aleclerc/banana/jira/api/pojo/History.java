package fr.aleclerc.banana.jira.api.pojo;

import fr.aleclerc.banana.utils.DateUtils;

import java.time.ZonedDateTime;
import java.util.List;

public class History {
    private String id;
    private ZonedDateTime created;
    private List<Item> items;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created =  DateUtils.getZonedDateTime(created);
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
