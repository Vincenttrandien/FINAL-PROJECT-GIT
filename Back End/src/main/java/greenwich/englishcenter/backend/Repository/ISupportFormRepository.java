package greenwich.englishcenter.backend.Repository;

import greenwich.englishcenter.backend.Entity.SupportForm;
import greenwich.englishcenter.backend.Form.response.PagingResponse;

public interface ISupportFormRepository {

    PagingResponse<SupportForm> findAllSupportForm(int pageNumber , int pageSize , String year);

    PagingResponse<SupportForm> searchByKey (int pageNumber , int pageSize , String year , String searchKey);

    SupportForm insert(SupportForm supportForm);

    SupportForm edit(SupportForm supportForm);

    SupportForm findById(String id);

    boolean delete(SupportForm supportForm);
}
