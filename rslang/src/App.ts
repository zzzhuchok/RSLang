import { TestComponents } from "./components/TestComponents/TestComponents";

export default class App {
  testComponents = new TestComponents();

  start() {
    this.testComponents.drawTestComponents();
  }
}