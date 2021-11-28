package greenwich.englishcenter.backend.Entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("classRoom")
public class classRoom {

    @Id
    @Field("_id")
    public ObjectId id;
    public String codeClass;
    public String date;
    public String usernameTeacher;
    public String usernameService;
    public String year;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getCodeClass() {
        return codeClass;
    }

    public void setCodeClass(String codeClass) {
        this.codeClass = codeClass;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getUsernameTeacher() {
        return usernameTeacher;
    }

    public void setUsernameTeacher(String usernameTeacher) {
        this.usernameTeacher = usernameTeacher;
    }

    public String getUsernameService() {
        return usernameService;
    }

    public void setUsernameService(String usernameService) {
        this.usernameService = usernameService;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}
