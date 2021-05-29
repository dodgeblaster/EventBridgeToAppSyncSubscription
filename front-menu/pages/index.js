import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Layout from "../components/Layout";
import { ProductCarBlank, ProductCard } from "../components/ProductCard";

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

const SUBSCRIPTION = `
    subscription onUpdate($PK: String!) {
        onUpdate(PK: $PK) {
          list {
            PK
            SK
            title
            category
            price
          }
        }
    }
`;

const STATE = {
  DEFAULT: "DEFAULT",
  LOADING: "LOADING",
  ERROR: "ERROR",
};

const defaultStore = "store_100";
const defaultImage = "/photo.jpeg";
let subscription;

export default function Home() {
  /**
   * Setup
   *
   */
  const [store, setStore] = useState(defaultStore);
  const [networkState, setNetworkState] = useState(STATE.LOADING);
  const [drinks, setDrinks] = useState([]);
  const [food, setFood] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setNetworkState(STATE.LOADING);
        const getResult = await API.graphql(
          graphqlOperation(GET_PRODUCTS, { PK: store })
        );
        const products = getResult.data.products;
        setDrinks(products.filter((x) => x.category === "drink"));
        setFood(products.filter((x) => x.category === "food"));
        setNetworkState(STATE.DEFAULT);

        subscription = API.graphql(
          graphqlOperation(SUBSCRIPTION, { PK: store })
        ).subscribe({
          next: (res) => {
            const products = res.value.data.onUpdate.list;
            setDrinks(products.filter((x) => x.category === "drink"));
            setFood(products.filter((x) => x.category === "food"));
          },
        });
      } catch (e) {
        setApiError(e.message);
        setNetworkState(STATE.ERROR);
      }
    })();

    return () => {
      subscription.unsubscribe();
    };
  }, [store]);

  /**
   * Shell
   *
   */
  const Shell = (props) => {
    const Drinks = props.drinks;
    const Food = props.food;
    return (
      <Layout>
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
            Coffee
          </h1>
          <hr className="border border-gray-300 mb-6" />

          <div className="flex">
            <Drinks />
          </div>
        </section>

        <section className="mb-10">
          <h1 className="title text-gray-800 font-bold text-6xl -mb-3 z-20">
            Food
          </h1>
          <hr className="border border-gray-300 mb-6" />

          <div className="flex">
            <Food />
          </div>
        </section>
      </Layout>
    );
  };

  /**
   * UI States
   *
   */
  if (networkState === STATE.ERROR) {
    return <p>{apiError}</p>;
  }

  if (networkState === STATE.LOADING) {
    return (
      <Shell
        drinks={() => (
          <>
            <ProductCarBlank />
            <ProductCarBlank />
            <ProductCarBlank />
            <ProductCarBlank />
          </>
        )}
        food={() => (
          <>
            <ProductCarBlank />
            <ProductCarBlank />
            <ProductCarBlank />
            <ProductCarBlank />
          </>
        )}
      />
    );
  }

  const drinksToDisplay = [0, 1, 2, 3].map((i) =>
    drinks[i] ? (
      <ProductCard
        key={drinks[i].SK}
        title={drinks[i].title}
        price={(drinks[i].price * 0.01).toFixed(2)}
        img={defaultImage}
      />
    ) : (
      <ProductCarBlank />
    )
  );

  const foodToDisplay = [0, 1, 2, 3].map((i) =>
    food[i] ? (
      <ProductCard
        key={food[i].SK}
        title={food[i].title}
        price={(food[i].price * 0.01).toFixed(2)}
        img={defaultImage}
      />
    ) : (
      <ProductCarBlank />
    )
  );

  return (
    <Shell
      drinks={() => <>{drinksToDisplay}</>}
      food={() => <>{foodToDisplay}</>}
    />
  );
}
