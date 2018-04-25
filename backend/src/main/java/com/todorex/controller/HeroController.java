package com.todorex.controller;

import com.todorex.dao.HeroRepository;
import com.todorex.entity.Hero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by rex on 2018/4/21.
 */
@RestController
@Transactional
// 只接受json数据
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class HeroController {
    @Autowired
    private HeroRepository repository;

    // RestfulAPI

    @GetMapping("/heroes")
    public List<Hero> getHeroes() {
        return repository.findAll();
    }

    @GetMapping("/heroes/{id}")
    public Hero getHeroById(@PathVariable("id") Long id) {
        return repository.findOne(id);
    }

    @GetMapping("/heroes/")
    public List<Hero> searchHeroes(@RequestParam("name") String name) {
        return repository.findByName(name);
    }

    @PostMapping("/heroes")
    public Hero addHero(@RequestBody Hero hero) {
        return repository.save(hero);
    }

    @DeleteMapping("/heroes/{id}")
    public void deleteHero(@PathVariable("id") Long id) {
        repository.deleteById(id);
    }

    @PutMapping("/heroes")
    public Hero updateHero(@RequestBody Hero hero) {
        return repository.save(hero);
    }

}
