package greenwich.englishcenter.backend.Repository.impl;

import greenwich.englishcenter.backend.Entity.SupportForm;
import greenwich.englishcenter.backend.Form.response.PagingResponse;
import greenwich.englishcenter.backend.Repository.ISupportFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SupportFormRepositoryImpl implements ISupportFormRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public PagingResponse<SupportForm> findAllSupportForm(int pageNumber, int pageSize, String year) {
        Query query = new Query(Criteria.where("year").is(year)).with(PageRequest.of(pageNumber -1,pageSize));
        List<SupportForm> content = mongoTemplate.find(query, SupportForm.class);
        long totalElements = mongoTemplate.count(new Query(), SupportForm.class);
        return new PagingResponse<>(content, totalElements);
    }

    @Override
    public PagingResponse<SupportForm> searchByKey(int pageNumber, int pageSize, String year, String searchKey) {
        Criteria username = Criteria.where("username").regex(searchKey,"i");
        Criteria options = Criteria.where("options").regex(searchKey, "i");
        Criteria summary = new Criteria().orOperator(username , options);

        Query pagingQuery = new Query(Criteria.where("year").is(year)).with(PageRequest.of(pageNumber -1 , pageSize));
        Query countQuery = new Query(summary);

        List<SupportForm> content = mongoTemplate.find(countQuery, SupportForm.class);
        long totalElements = mongoTemplate.count(pagingQuery, SupportForm.class);
        return new PagingResponse<>(content, totalElements);
    }

    @Override
    public SupportForm insert(SupportForm supportForm) {
        return mongoTemplate.save(supportForm);
    }

    @Override
    public SupportForm edit(SupportForm supportForm) {
        return mongoTemplate.save(supportForm);
    }

    @Override
    public SupportForm findById(String id) {
        Query query = new Query().addCriteria(Criteria.where("_id").is(id));
        return mongoTemplate.findOne(query, SupportForm.class);
    }

    @Override
    public boolean delete(SupportForm supportForm) {
        return mongoTemplate.remove(supportForm).getDeletedCount() > 0;
    }
}
