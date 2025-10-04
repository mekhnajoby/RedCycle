import { ProductInventory } from "@/hooks/useWasteManagement";
import { Package2 } from "lucide-react";

interface ProductShelfProps {
  products: ProductInventory;
}

export const ProductShelf = ({ products }: ProductShelfProps) => {
  const productList = Object.values(products);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold flex items-center gap-2">
        <Package2 className="w-5 h-5 text-success" />
        Products Manufactured
      </h3>
      
      {productList.length === 0 ? (
        <p className="text-sm text-muted-foreground">No products yet. Start processing materials!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {productList.map((product) => (
            <div
              key={product.name}
              className="bg-success/5 border border-success/20 rounded-lg p-3 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold text-foreground">{product.name}</div>
                <div className="text-xs text-muted-foreground">{product.qty} items</div>
              </div>
              <div className="text-sm font-bold text-success">{product.kg} kg</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
