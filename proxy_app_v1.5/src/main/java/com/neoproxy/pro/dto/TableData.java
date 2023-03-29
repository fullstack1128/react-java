package com.neoproxy.pro.dto;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

@Data
public class TableData<T> {
    private int pages;
    private List<T> data;

    public TableData(){
        data = new ArrayList<>();
    }

    public TableData(Page<T> page){
        pages = page.getTotalPages();
        data = page.getContent();
    }
}
