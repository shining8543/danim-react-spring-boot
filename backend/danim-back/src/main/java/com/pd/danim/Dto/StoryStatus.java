package com.pd.danim.Dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum StoryStatus {
	PUBLISHED, PRIVATED, TEMP, DELETED;
}
