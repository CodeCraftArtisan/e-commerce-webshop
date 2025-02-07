package be.codecraft.webshop.controller.service;

import be.codecraft.webshop.datamodel.model.Order;
import be.codecraft.webshop.datamodel.model.dto.OrderDTO;
import be.codecraft.webshop.datamodel.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final EntityMapper entityMapper;

    public OrderService(OrderRepository orderRepository, EntityMapper entityMapper) {
        this.orderRepository = orderRepository;
        this.entityMapper = entityMapper;
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(entityMapper::convertOrderToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrderDTO getOrderById(UUID id) {
        return orderRepository.findById(id)
                .map(entityMapper::convertOrderToDTO)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Transactional
    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = entityMapper.convertOrderToEntity(orderDTO);
        order = orderRepository.save(order);
        return entityMapper.convertOrderToDTO(order);
    }

    @Transactional
    public OrderDTO updateOrder(UUID id, OrderDTO orderDTO) {
        Order newOrder = entityMapper.convertOrderToEntity(orderDTO);
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setUser(newOrder.getUser());
        order.setItems(newOrder.getItems());
        order.setTotalPrice(newOrder.getTotalPrice());
        order.setOrderStatus(newOrder.getOrderStatus());
        order.setUpdatedAt(new Date());
        order = orderRepository.save(order);
        return entityMapper.convertOrderToDTO(order);
    }

    @Transactional
    public void deleteOrder(UUID id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }
        orderRepository.deleteById(id);
    }
}