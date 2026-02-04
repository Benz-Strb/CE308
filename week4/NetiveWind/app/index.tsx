import "./global.css"
import { CenteredView } from './components/CenteredView';
import { CustomButton } from "./components/CustomButton";
import { ItemList } from "./components/ItemList";

export default function Index() {
  const item = [
    { id: "1", productName: "Banana", price: 2000, pcs: 10, btnSize: "sm" as const, btnColor: "primary" as const },
    { id: "2", productName: "Mango", price: 2000, pcs: 10, btnSize: "md" as const, btnColor: "secondary" as const },
    { id: "3", productName: "Apple", price: 2000, pcs: 10, btnSize: "lg" as const, btnColor: "danger" as const },
  ];

  return (
    <CenteredView>
      <ItemList items={item}/>
    </CenteredView>
  );
}