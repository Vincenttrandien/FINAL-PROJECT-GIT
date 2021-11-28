package greenwich.englishcenter.backend.Service;

import greenwich.englishcenter.backend.Entity.ContactUsForm;
import greenwich.englishcenter.backend.Exception.ServiceException;
import greenwich.englishcenter.backend.Form.response.PagingResponse;

public interface IContactUsFormService {
    PagingResponse<ContactUsForm>  findAllContact (int pageNumber , int pageSize , String year);

    PagingResponse<ContactUsForm> searchKey(int pageNumber, int pageSize, String year, String searchKey);

    ContactUsForm insert(ContactUsForm contactUsForm) ;

    ContactUsForm findById (String id) throws ServiceException;

    boolean delete(ContactUsForm contactUsForm) ;
}
