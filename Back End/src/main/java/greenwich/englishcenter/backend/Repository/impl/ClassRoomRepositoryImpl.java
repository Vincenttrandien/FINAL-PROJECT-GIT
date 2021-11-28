package greenwich.englishcenter.backend.Repository.impl;



import greenwich.englishcenter.backend.Entity.classRoom;

import greenwich.englishcenter.backend.Form.response.PagingResponse;
import greenwich.englishcenter.backend.Repository.IclassRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ClassRoomRepositoryImpl implements IclassRoomRepository {

    @Autowired
    MongoTemplate mongoTemplate;


    @Override
    public PagingResponse<classRoom> findAllRoom(int pageNumber, int pageSize, String year) {
        Query query = new Query(Criteria.where("year").is(year)).with(PageRequest.of(pageNumber -1,pageSize));
        List<classRoom> content = mongoTemplate.find(query, classRoom.class);
        long totalElements = mongoTemplate.count(new Query(), classRoom.class);
        return new PagingResponse<>(content, totalElements);
    }

    @Override
    public PagingResponse<classRoom> searchKey(int pageNumber, int pageSize, String year, String searchKey) {
        Criteria codeClass = Criteria.where("codeClass").regex(searchKey, "i");
        Criteria findByTeacher = Criteria.where("usernameTeacher").regex(searchKey, "i");
        Criteria findByService = Criteria.where("usernameService").regex(searchKey, "i");
        Criteria summary =  new Criteria().orOperator(codeClass,findByTeacher , findByService);

        Query pagingQuery = new Query(Criteria.where("year").is(year)).with(PageRequest.of(pageNumber -1 , pageSize));
        Query countQuery = new Query(summary);

        List<classRoom> content = mongoTemplate.find(countQuery , classRoom.class);
        long totalElements = mongoTemplate.count(pagingQuery, classRoom.class);


        return new PagingResponse<>(content , totalElements);
    }


    @Override
    public classRoom insert(classRoom classRoom) {
        return mongoTemplate.save(classRoom);
    }

    @Override
    public classRoom edit(classRoom classRoom) {
        return mongoTemplate.save(classRoom);
    }

    @Override
    public classRoom findById(String id) {
        Query query = new Query().addCriteria(Criteria.where("_id").is(id));
        return mongoTemplate.findOne(query, classRoom.class);
    }

    @Override
    public boolean delete(classRoom ClassRoom) {
        return mongoTemplate.remove(ClassRoom).getDeletedCount() > 0;
    }

    @Override
    public classRoom existedClass(String codeClass,  String date) {
        Criteria existClass = Criteria.where("codeClass").regex("^" + codeClass + "$", "i");
        Criteria existDate = Criteria.where("date").regex("^" + date + "$", "i");
        Criteria summary = new Criteria().orOperator(existClass, existDate);
        Query query = new Query(summary);
        return mongoTemplate.findOne(query, classRoom.class);
    }

    @Override
    public classRoom findByTeacher(String usernameTeacher){
        Query query = new Query().addCriteria(Criteria.where("usernameTeacher").regex("^" + usernameTeacher + "$", "i"));
        return mongoTemplate.findOne(query, classRoom.class);
    }

    @Override
    public classRoom findByService(String usernameService){
        Query query = new Query().addCriteria(Criteria.where("usernameService").regex("^" + usernameService + "$", "i"));
        return mongoTemplate.findOne(query, classRoom.class);
    }

}
