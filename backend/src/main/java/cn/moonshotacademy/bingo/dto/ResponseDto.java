package cn.moonshotacademy.bingo.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDto<T> {
    private Integer code = 0;
    private String message = "Success";

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data = null;

    public ResponseDto(T data) {
        this.data = data;
    }

    public static ResponseDto<Void> success() {
        return new ResponseDto<>();
    }

    public static <T> ResponseDto<T> success(T data) {
        return new ResponseDto<>(data);
    }

    public static ResponseDto<Void> error(Integer code, String message) {
        return new ResponseDto<>(code, message, null);
    }
}
