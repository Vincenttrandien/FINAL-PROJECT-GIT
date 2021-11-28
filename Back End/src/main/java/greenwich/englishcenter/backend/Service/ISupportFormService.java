package greenwich.englishcenter.backend.Service;

import greenwich.englishcenter.backend.Entity.SupportForm;
import greenwich.englishcenter.backend.Exception.ServiceException;
import greenwich.englishcenter.backend.Form.response.PagingResponse;

public interface ISupportFormService {

    PagingResponse<SupportForm> findAllSupportForm(int pageNumber , int pageSize , String year);

    PagingResponse<SupportForm> searchByKey (int pageNumber , int pageSize , String year , String searchKey);

    SupportForm insert(SupportForm supportForm);

    SupportForm edit(SupportForm supportForm);

    SupportForm findById(String id) throws ServiceException;

    boolean delete(SupportForm supportForm);
}
