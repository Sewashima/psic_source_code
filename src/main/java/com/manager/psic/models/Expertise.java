package com.manager.psic.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Expertise {
    @JsonProperty("Physiotherapy")
    PHYSIOTHERAPY,

    @JsonProperty("Osteopathy")
    OSTEOPATHY,

    @JsonProperty("Rehabilitation")
    REHABILITATION
}
