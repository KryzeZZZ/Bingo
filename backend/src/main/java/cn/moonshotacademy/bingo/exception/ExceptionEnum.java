package cn.moonshotacademy.bingo.exception;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionEnum {
    MISSING_PARAMETERS(1001, "Missing Parameters"),
    ILLEGAL_PARAMETERS(1002, "Illegal Parameters"),

    TEAM_NOT_FOUND(2002, "Team not found"),
    NO_SESSIONS_REMAIN(2003, "No sessions remain"),
    TEAM_NAME_CHANGED(2004, "Team name has been changed"),

    NOT_ENOUGH_QUESTIONS(3001, "There are not enough questions"),
    ALREADY_CHOSEN(3002, "You have already chose questions");

    private final Integer code;
    private final String message;
}