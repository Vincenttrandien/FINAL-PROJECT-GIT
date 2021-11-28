package greenwich.englishcenter.backend.Exception;

public enum NotFoundException {

    USER_EXISTED("USER IS EXISTED "),
    USER_NOT_FOUND("ERROR 404 : USER UNKNOWN"),

    CONTACTUSFORM_NOTFOUND("ERROR 404: FORM NOT FOUND"),

    SUPPORTFORM_NOTFOUND("ERROR 404: FROM NOT FOUND"),

    CLASSROOM_NOTFOUND("ERROR 404 : CLASS NOT FOUND"),
    CLASSROOM_EXISTED("ERROR 404 : CLASS IS EXISTED");



    private final String desc;

    private NotFoundException(String desc) {
        this.desc = desc;
    }

    public String getDesc() {
        return desc;
    }
}
