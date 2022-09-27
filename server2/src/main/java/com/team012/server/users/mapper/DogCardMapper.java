package com.team012.server.users.mapper;

import com.team012.server.users.entity.DogCard;
import com.team012.server.users.dto.DogCardDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DogCardMapper {
    DogCard dogDtoToDogCard(DogCardDto.Post dogCardDto);

    default DogCardDto.Response dogCardToDtoResponse(DogCard dogCard) {

        return DogCardDto.Response.builder()

                .id(dogCard.getId())
                .photoImgUrl(dogCard.getPhotoImgUrl())
                .dogName(dogCard.getDogName())
                .type(dogCard.getType())
                .gender(dogCard.getGender())
                .age(dogCard.getAge())
                .etc(dogCard.getEtc())
                .snackMethod(dogCard.getSnackMethod())
                .bark(dogCard.getBark())
                .surgery(dogCard.getSurgery())
                .bowelTrained(dogCard.getBowelTrained())
                .username(dogCard.getUsers().getUsername())
                .build();
    }
}