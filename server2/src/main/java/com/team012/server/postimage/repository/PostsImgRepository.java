package com.team012.server.postimage.repository;

import com.team012.server.postimage.entity.PostsImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostsImgRepository extends JpaRepository<PostsImg, Long> {
    @Query("select i from PostsImg i where i.posts.id = :id")
    List<PostsImg> findAllByPostsId(@Param("id")Long id);


}
