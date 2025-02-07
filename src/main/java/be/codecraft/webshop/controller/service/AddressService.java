package be.codecraft.webshop.controller.service;

import be.codecraft.webshop.datamodel.model.Address;
import be.codecraft.webshop.datamodel.model.AddressDetails;
import be.codecraft.webshop.datamodel.model.dto.AddressDTO;
import be.codecraft.webshop.datamodel.repository.AddressRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AddressService {

    private final AddressRepository addressRepository;
    private final EntityMapper entityMapper;

    public AddressService(AddressRepository addressRepository, EntityMapper entityMapper) {
        this.addressRepository = addressRepository;
        this.entityMapper = entityMapper;
    }

    @Transactional
    public AddressDTO getAddressById(UUID addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new IllegalArgumentException("Address not found for ID: " + addressId));
        return entityMapper.convertAddressToDTO(address);
    }

    @Transactional
    public AddressDTO getAddressByUserEmail(String userEmail) {
        Address address = addressRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("Address not found for user: " + userEmail));
        return entityMapper.convertAddressToDTO(address);
    }

    @Transactional
    public AddressDTO createAddress(AddressDTO addressDTO) {
        Address newAddress = entityMapper.convertAddressToEntity(addressDTO);

        Address savedAddress = addressRepository.save(newAddress);
        return entityMapper.convertAddressToDTO(savedAddress);
    }

    @Transactional
    public AddressDTO updateAddress(UUID addressId, AddressDTO addressDTO) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new IllegalArgumentException("Address not found for ID: " + addressId));

        AddressDetails addressDetails = address.getAddressDetails();
        addressDetails.setStreet(addressDTO.getStreet());
        addressDetails.setCity(addressDTO.getCity());
        addressDetails.setPostalCode(addressDTO.getPostalCode());
        addressDetails.setCountry(addressDTO.getCountry());

        addressRepository.save(address);

        return entityMapper.convertAddressToDTO(address);
    }

    @Transactional
    public void deleteAddress(UUID addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new IllegalArgumentException("Address not found for ID: " + addressId));
        addressRepository.delete(address);
    }

    @Transactional
    public void deleteAddressByUserEmail(String userEmail) {
        Address address = addressRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("Address not found for user: " + userEmail));
        addressRepository.delete(address);
    }

}
