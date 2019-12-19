import {
  get,
  patch,
  post,
  param,
  requestBody
} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {OrderRepository} from '../repositories';
import {Order} from '../models';

export class OrdersController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) {}

  @get('/orders')
  list() {
    return this.orderRepository.find();
  }

  @get('/orders/{id}')
  get(
    @param.path.number('id') id: number,
  ) {
    return this.orderRepository.findById(id);
  }

  @patch('/orders/{id}')
  update(
    @param.path.number('id') id: number,
    @requestBody() order: Order,
  ) {
    return this.orderRepository.updateById(id, order);
  }

  @post('/orders')
  create(
    @requestBody() order: Omit<Order, 'id'>,
  ) {
    return this.orderRepository.create(order);
  }
}