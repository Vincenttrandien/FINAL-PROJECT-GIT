package greenwich.englishcenter.backend.Service.impl;

import greenwich.englishcenter.backend.Entity.ContactUsForm;
import greenwich.englishcenter.backend.Entity.SupportForm;
import greenwich.englishcenter.backend.Exception.NotFoundException;
import greenwich.englishcenter.backend.Exception.ServiceException;
import greenwich.englishcenter.backend.Form.response.PagingResponse;
import greenwich.englishcenter.backend.Repository.ISupportFormRepository;
import greenwich.englishcenter.backend.Service.IContactUsFormService;
import greenwich.englishcenter.backend.Service.ISupportFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class SupportFormServiceImpl implements ISupportFormService {

    @Autowired
    ISupportFormRepository supportFormRepository;


    @Override
    public PagingResponse<SupportForm> findAllSupportForm(int pageNumber, int pageSize, String year) {
        return supportFormRepository.findAllSupportForm(pageNumber, pageSize, year);
    }

    @Override
    public PagingResponse<SupportForm> searchByKey(int pageNumber, int pageSize, String year, String searchKey) {
        return supportFormRepository.searchByKey(pageNumber, pageSize, year, searchKey);
    }

    @Override
    public SupportForm insert(SupportForm supportForm) {
        return supportFormRepository.insert(supportForm);
    }

    @Override
    public SupportForm edit(SupportForm supportForm) {
        return supportFormRepository.edit(supportForm);
    }

    @Override
    public SupportForm findById(String id) throws ServiceException{
        SupportForm supportForm = supportFormRepository.findById(id);
        if(supportForm == null){
            throw new ServiceException(NotFoundException.SUPPORTFORM_NOTFOUND.getDesc(), HttpStatus.BAD_REQUEST);
        }
        return supportForm;
    }

    @Override
    public boolean delete(SupportForm supportForm) {
        return supportFormRepository.delete(supportForm);
    }
}
