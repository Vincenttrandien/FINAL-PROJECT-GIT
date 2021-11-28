package greenwich.englishcenter.backend.Controllers;


import greenwich.englishcenter.backend.Entity.SupportForm;
import greenwich.englishcenter.backend.Exception.ServiceException;
import greenwich.englishcenter.backend.Form.response.PagingResponse;
import greenwich.englishcenter.backend.Service.ISupportFormService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/greenwich/EnglishCenter/SupportForm")
public class SupportFormController {

    @Autowired
    ISupportFormService supportFormService;

    @GetMapping("/{id}")
    public ResponseEntity<SupportForm> findById(@PathVariable("id") String id) throws ServiceException{
        return ResponseEntity.status(HttpStatus.OK).body(supportFormService.findById(id));
    }

    @GetMapping("/getAll")
    public ResponseEntity<PagingResponse<SupportForm>> findAllForm(@RequestParam int pageNumber,
                                                                   @RequestParam int pageSize,
                                                                   @RequestParam String year){
        return ResponseEntity.status(HttpStatus.OK)
                .body(supportFormService.findAllSupportForm(pageNumber, pageSize, year));
    }

    @GetMapping("/searchByKey")
    public ResponseEntity<PagingResponse<SupportForm>> searchKey(@RequestParam int pageNumber,
                                                                 @RequestParam int pageSize,
                                                                 @RequestParam String year,
                                                                 @RequestParam String searchKey){
        return ResponseEntity.status(HttpStatus.OK)
                .body(supportFormService.searchByKey(pageNumber, pageSize, year, searchKey));
    }

    @PostMapping("/create")
    public ResponseEntity<SupportForm> createForm(@RequestBody SupportForm supportForm){
        return ResponseEntity.status(HttpStatus.OK)
                .body(supportFormService.insert(supportForm));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupportForm> edit(
            @PathVariable("id") ObjectId id,
            @RequestBody SupportForm supportForm){
        supportForm.setId(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(supportFormService.edit(supportForm));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> remove(@PathVariable("id") String id) throws ServiceException{
        return ResponseEntity.status(HttpStatus.OK)
                .body(supportFormService.delete(supportFormService.findById(id)));
    }

}
