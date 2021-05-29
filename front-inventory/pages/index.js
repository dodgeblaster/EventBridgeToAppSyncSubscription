import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Layout from "../components/Layout";
import AddButton from "../components/AddButton";
import { ProductCard, ProductCardBlank } from "../components/ProductCard";

/**
 * GraphQL Queries
 *
 */
const GET_PRODUCTS = `
  query lisProducts($PK: String!) {
    products(PK: $PK) {
        PK
        SK
        title
        category
        price
    }
  }
`;

const CREATE_ITEM = `
  mutation create($storeId: String!, $title: String!, $price: String! $category: String!) {
    create(storeId: $storeId, title: $title, price: $price, category: $category) {
            PK
            SK
            title
            price
            category
        }
    }
`;

const REMOVE_ITEM = `
  mutation remove($PK: String!, $SK: String!) {
    remove(PK: $PK, SK: $SK) {
            PK
            SK
        }
    }
`;

const img =
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80";

const makeRandomProduct = (store) => {
  const getRandom = (array) => array[Math.floor(Math.random() * array.length)];
  const productNames = {
    drink: ["Dark Coffee", "Light Coffee", "Medium Coffee", "Latte", "Mocha"],
    food: ["Muffin", "Begal", "Banana Bread", "Toast", "Sandwhich"],
  };
  const category = getRandom(["drink", "food"]);
  const title = getRandom(productNames[category]);
  const price = getRandom([
    199, 299, 399, 499, 599, 699, 799, 899, 999,
  ]).toString();
  return {
    storeId: store,
    title,
    price,
    category,
  };
};

const STATE = {
  DEFAULT: "DEFAULT",
  LOADING: "LOADING",
  ERROR: "ERROR",
  SAVING: "SAVING",
  REMOVING: "REMOVING",
};

const defaultStore = "store_100";

export default function Home() {
  /**
   * Setup
   *
   */
  const [store, setStore] = useState(defaultStore);
  const [networkState, setNetworkState] = useState(STATE.LOADING);
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    (async () => {
      setNetworkState(STATE.LOADING);
      try {
        const getResult = await API.graphql(
          graphqlOperation(GET_PRODUCTS, { PK: store })
        );

        const products = getResult.data.products || [];
        setProducts(products);
      } catch (e) {
        setApiError(e.message);
      }
      setNetworkState(STATE.DEFAULT);
    })();
  }, [store]);

  /**
   * Handlers
   *
   */
  const create = async () => {
    setNetworkState(STATE.SAVING);
    await API.graphql(graphqlOperation(CREATE_ITEM, makeRandomProduct(store)));
    const getResult = await API.graphql(
      graphqlOperation(GET_PRODUCTS, { PK: store })
    );
    const products = getResult.data.products || [];
    setProducts(products);
    setNetworkState(STATE.DEFAULT);
  };

  const remove = async (PK, SK) => {
    setNetworkState(STATE.REMOVING);
    await API.graphql(
      graphqlOperation(REMOVE_ITEM, {
        PK,
        SK,
      })
    );
    const getResult = await API.graphql(
      graphqlOperation(GET_PRODUCTS, { PK: store })
    );
    const products = getResult.data.products || [];
    setProducts(products);
    setNetworkState(STATE.DEFAULT);
  };

  /**
   * Shell
   *
   */
  const Shell = (props) => (
    <Layout store={store} setStore={setStore}>
      <button
        className={`absolute top-2 left-2 opacity-50 ${
          store === "store_100" && "opacity-100"
        }`}
        onClick={() => setStore("store_100")}
      >
        Store 1
      </button>
      <button
        className={`absolute top-8 left-2 opacity-50 ${
          store === "store_200" && "opacity-100"
        }`}
        onClick={() => setStore("store_200")}
      >
        Store 2
      </button>
      <section className="mb-10">
        <h1 className="title text-gray-800 font-bold text-6xl -mb-3 z-20">
          Store Admin
        </h1>
        <hr className="border border-gray-300 mb-6" />
        {props.children}
      </section>
    </Layout>
  );

  /**
   * UI States
   *
   */
  if (networkState === STATE.ERROR) {
    return (
      <Shell>
        <p>{apiError}</p>
      </Shell>
    );
  }

  if (networkState === STATE.LOADING) {
    return (
      <Shell>
        <div className="flex flex-col">
          <ProductCardBlank />
          <ProductCardBlank />
          <ProductCardBlank />
          <AddButton onClick={create} text="Add Item" disabled={true} />
        </div>
      </Shell>
    );
  }

  let buttonText = "Add Item";
  if (networkState === STATE.SAVING) {
    buttonText = "Adding Item...";
  }

  if (networkState === STATE.REMOVING) {
    buttonText = "Removing Item...";
  }

  return (
    <Shell>
      <div className="flex flex-col">
        {products.map((x) => (
          <ProductCard
            key={x.SK}
            onClick={() => remove(x.PK, x.SK)}
            title={x.title}
            price={(x.price * 0.01).toFixed(2)}
            img={img}
          />
        ))}

        <AddButton
          onClick={create}
          text={buttonText}
          disabled={networkState !== STATE.DEFAULT}
        />
      </div>
    </Shell>
  );
}
