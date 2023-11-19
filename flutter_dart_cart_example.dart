import 'package:archpublicmarket/domain/entities/entity.dart';

class ProdCartEntity extends Entity<int> {
  final int prodId;
  final int prodCount;
  final double totalPrice;

  ProdCartEntity(
    {required int id,
    required this.prodId,
    required this.prodCount,
    required this.totalPrice}) : super(id);

  @override
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'prodId': prodId,
      'prodCount': prodCount,
      'totalPrice': totalPrice,
    };
  }

  @override
  List<Object> get props => [
    id, 
    prodId, 
    prodCount, 
    totalPrice
  ];
}