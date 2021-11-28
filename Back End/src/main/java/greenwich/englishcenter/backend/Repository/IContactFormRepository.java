package greenwich.englishcenter.backend.Repository;

import greenwich.englishcenter.backend.Entity.ContactUsForm;
import greenwich.englishcenter.backend.Form.response.PagingResponse;
import org.springframework.http.ResponseEntity;

public interface IContactFormRepository {
    PagingResponse<ContactUsForm>  findAllContact (int pageNumber , int pageSize , String year);

    PagingResponse<ContactUsForm> searchKey(int pageNumber, int pageSize, String year, String searchKey);

    ContactUsForm insert(ContactUsForm contactUsForm);

    ContactUsForm findById (String id);

    boolean delete(ContactUsForm contactUsForm);


}
