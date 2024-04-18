import React from "react";

function AboutUs() {
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      textAlign: "",
    },
    header: {
      textAlign: "center",
      fontSize: "2rem",
      color: "#333",
      marginBottom: "20px",
    },
    content: {
      lineHeight: "1.6",
    },
    boldParagraph: {
      marginBottom: "15px",
      fontWeight: "bold",
    },
    paragraph: {
      marginBottom: "15px",
    },
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>About Us</h1>
      <div style={styles.content}>
        <p style={styles.boldParagraph}>
          Welcome to Food Restaurant, where flavors come alive and memories are
          made!
        </p>
        <h3 style={styles.header}>Our Story</h3>
        <p style={styles.paragraph}>
          Founded in 1999, Food Restaurant has been a cornerstone of culinary
          excellence in Waterloo ever since. It all started with a vision shared
          by Kane Willianson, a passionate chef with a dream to create a dining
          experience that not only tantalizes taste buds but also warms the
          soul.
        </p>
        <p style={styles.paragraph}>
          Kane Willianson, driven by a profound love for food and a desire to
          share it with the world, embarked on a journey to bring his culinary
          creations to life. Armed with nothing but a fervent ambition and a
          handful of cherished family recipes, he opened the doors of Food
          Restaurant to the bustling streets of Waterloo.
        </p>
        <p style={styles.paragraph}>
          From humble beginnings, our restaurant quickly gained a reputation for
          its delectable dishes, warm hospitality, and inviting ambiance. With
          each passing year, Food Restaurant has grown and evolved, yet our
          commitment to serving exceptional food and creating unforgettable
          dining experiences remains unwavering.
        </p>

        <h3 style={styles.header}>Our Philosophy</h3>
        <p style={styles.paragraph}>
          At Food Restaurant, we believe that food is not merely sustenance; it
          is a celebration of life, love, and culture. Every dish we prepare is
          infused with passion, creativity, and the finest ingredients, sourced
          locally and responsibly whenever possible. We take pride in our craft
          and strive to delight every palate that graces our tables.
        </p>
        <h3 style={styles.header}>Join Us</h3>
        <p style={styles.paragraph}>
          WWhether you're craving a comforting classic or eager to explore bold
          new flavors, Food Restaurant invites you to join us on a culinary
          journey like no other. Come savor the taste of tradition, the joy of
          discovery, and the warmth of community at Food Restaurant.
        </p>
        <p style={styles.paragraph}>
          Thank you for choosing our Restaurant Order Management System. If you
          have any questions or feedback, feel free to reach out to us.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
