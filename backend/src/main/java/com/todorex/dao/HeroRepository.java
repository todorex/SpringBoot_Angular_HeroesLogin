package com.todorex.dao;

import com.todorex.entity.Hero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by rex on 2018/4/21.
 */
public interface HeroRepository extends JpaRepository<Hero,Long> {

    @Query("select h from Hero h where lower(h.name) like CONCAT('%', lower(:name), '%')")
    List<Hero> findByName(@Param("name") String name);

    @Query("select h from Hero h where h.id=:id")
    Hero findOne(@Param("id") Long id);
}
