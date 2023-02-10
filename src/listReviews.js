import ReviewWithLike from "./reviewCard";
import NavBar from "./NavBar";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";
import { useState, useEffect, useRef } from "react";
import { Grid } from "@chakra-ui/layout";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

export default function ReviewPage() {
  const [results, setResults] = useState([]);
  //const [allImages, setImages] = useState([]);
  const allImages = useRef();
  const [updatedReviews, setReviews] = useState([]);

  //const storageRef = ref(storage);

  const getReview = async () => {
    const colRef = collection(db, "reviews");
    try {
      const docsSnap = await getDocs(colRef);
      if (docsSnap.docs.length > 0) {
        const reviews = [];
        docsSnap.forEach((doc) => {
          reviews.push(doc.data());
          //console.log(doc.data());
        });
        setResults(reviews);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  const getImage = async (result, index) => {
    const storage = getStorage();
    const pathName = "/" + result.postal_code + " / " + result.problem;
    const url = await getDownloadURL(ref(storage, pathName));
    return { url, index };
  };

useEffect(() => {
    const images = [];
    const reviews = [];
    Promise.all(
      results.map(async (result, index) => {
        const image = await getImage(result, index);
        images.push(image);
      })
    ).then(() => {
      allImages.current = images;
      allImages.current.sort((a, b) => a.index - b.index);
      allImages.current.forEach((image) => {
        const result = results[image.index];
        reviews.push(
          <ReviewWithLike
            description={result.region}
            fault={result.problem}
            improvement={result.improvement}
            address1={result.address1}
            postalcode={result.postal_code}
            image={image.url}
          />
        );
      });
      if (reviews.length === results.length) setReviews(reviews);
    });
  }, [results, allImages]);

  /*
  const reviews = results.map((result, index) => {
    const image = allImages.current[index];
    //console.log(image);
    //console.log(allImages);
    return (
      <ReviewWithLike
        description={result.region}
        fault={result.problem}
        improvement={result.improvement}
        address1={result.address1}
        postalcode={result.postal_code}
        image={image}
      />
    );
  });
  */

  return (
    <>
      <NavBar />
      <Grid templateColumns="repeat(3, 1fr)" spacing={20} px={20}>
        {updatedReviews}
      </Grid>
    </>
  );
}
