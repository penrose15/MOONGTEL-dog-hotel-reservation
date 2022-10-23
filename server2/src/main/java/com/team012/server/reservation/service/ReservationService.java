package com.team012.server.reservation.service;

import com.team012.server.reservation.entity.Reservation;
import com.team012.server.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;


@Transactional
@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;

    // 회사별 예약 조회
    @Transactional(readOnly = true)
    public Page<Reservation> getReservation(Long companyId, Integer page, Integer size) {
        // id 기준으로 내림차순 정렬

        return reservationRepository.findByCompanyId(companyId,
                PageRequest.of(page, size, Sort.by("usersId").descending()));
    }

    // 예약확인 --> 예약상태 수정
    public void confirmReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow(() -> new RuntimeException("reservation Not found"));

        if (reservation != null) {
            reservation.setStatus("확정");
            reservationRepository.save(reservation);
        }

    }

    // 예약취소 API
    public void cancelReservation(Long id) {
        reservationRepository.findById(id).orElseThrow(NoSuchElementException::new);

        reservationRepository.deleteById(id);
    }
}
