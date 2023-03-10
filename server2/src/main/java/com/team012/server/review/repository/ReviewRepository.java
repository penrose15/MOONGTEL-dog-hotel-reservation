package com.team012.server.review.repository;

import com.team012.server.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByUserId(Long userId);

    Page<Review> findAllByPostsId(Pageable pageable, Long postsId);

}
