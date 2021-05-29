import Head from "next/head";

export default function Layout(props) {
  return (
    <div className="bg-gradient-to-tr from-gray-50 to-gray-300">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div
          style={{
            margin: "0 auto",
            paddingTop: "80px",
            maxWidth: 900,
            width: "98%",
            minHeight: "100vh",
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "stretch",
            }}
          >
            {props.children}
          </div>
        </div>
      </main>
    </div>
  );
}
