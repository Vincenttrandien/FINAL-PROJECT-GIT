package greenwich.englishcenter.backend.Controllers;


import greenwich.englishcenter.backend.Entity.ContactUsForm;
import greenwich.englishcenter.backend.Exception.ServiceException;
import greenwich.englishcenter.backend.Form.response.PagingResponse;
import greenwich.englishcenter.backend.Service.IContactUsFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/greenwich/EnglishCenter/ContactForm")
public class ContactUsFormController {

    @Autowired
    IContactUsFormService contactUsFormService;

    @GetMapping("/{id}")
    public ResponseEntity<ContactUsForm> findById(@PathVariable("id") String id) throws ServiceException {
        return ResponseEntity.status(HttpStatus.OK).body(contactUsFormService.findById(id));
    }

    @GetMapping("/getAll")
    public ResponseEntity<PagingResponse<ContactUsForm>> findAllContact(@RequestParam int pageNumber ,
                                                                  @RequestParam int pageSize,
                                                                  @RequestParam String year) {
        return ResponseEntity.status(HttpStatus.OK).
                body(contactUsFormService.findAllContact(pageNumber,pageSize,year));
    }

    @GetMapping("/searchByKey")
    public ResponseEntity<PagingResponse<ContactUsForm>> searchKey(@RequestParam int pageNumber,
                                                               @RequestParam int pageSize,
                                                               @RequestParam String year,
                                                               @RequestParam String searchKey){
        return  ResponseEntity.status(HttpStatus.OK)
                .body(contactUsFormService.searchKey(pageNumber, pageSize, year, searchKey));
    }

    @PostMapping("/create")
    public ResponseEntity<ContactUsForm> createForm(@RequestBody ContactUsForm contactUsForm){
        return ResponseEntity.status(HttpStatus.OK)
                .body(contactUsFormService.insert(contactUsForm));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> remove(@PathVariable("id") String id) throws ServiceException{
        return ResponseEntity.status(HttpStatus.OK)
                .body(contactUsFormService.delete(contactUsFormService.findById(id)));
    }
}
