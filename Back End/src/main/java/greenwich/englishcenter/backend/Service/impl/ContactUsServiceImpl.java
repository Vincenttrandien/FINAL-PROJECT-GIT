package greenwich.englishcenter.backend.Service.impl;

import greenwich.englishcenter.backend.Entity.ContactUsForm;
import greenwich.englishcenter.backend.Exception.NotFoundException;
import greenwich.englishcenter.backend.Exception.ServiceException;
import greenwich.englishcenter.backend.Form.response.PagingResponse;
import greenwich.englishcenter.backend.Repository.IContactFormRepository;
import greenwich.englishcenter.backend.Service.IContactUsFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ContactUsServiceImpl implements IContactUsFormService {

    @Autowired
    IContactFormRepository contactFormRepository;

    @Override
    public PagingResponse<ContactUsForm> findAllContact(int pageNumber, int pageSize, String year) {
        return contactFormRepository.findAllContact(pageNumber, pageSize, year);
    }

    @Override
    public PagingResponse<ContactUsForm> searchKey(int pageNumber, int pageSize, String year, String searchKey) {
        return contactFormRepository.searchKey(pageNumber, pageSize, year, searchKey);
    }

    @Override
    public ContactUsForm insert(ContactUsForm contactUsForm)  {
        return contactFormRepository.insert(contactUsForm);
    }

    @Override
    public ContactUsForm findById(String id) throws ServiceException {
        ContactUsForm contactUsForm = contactFormRepository.findById(id);
        if(contactUsForm == null){
            throw new ServiceException(NotFoundException.CONTACTUSFORM_NOTFOUND.getDesc(), HttpStatus.BAD_REQUEST);
        }
        return contactUsForm;
    }

    @Override
    public boolean delete(ContactUsForm contactUsForm)  {
        return contactFormRepository.delete(contactUsForm);
    }
}
