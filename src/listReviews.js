import ReviewWithLike from "./reviewCard";
import NavBar from "./NavBar";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";
import { useState, useEffect } from "react";
import { Grid } from "@chakra-ui/layout";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

export default function ReviewPage() {
  const [results, setResults] = useState([]);
  const [allImages, setImages] = useState([]);
  const storage = getStorage();
  const storageRef = ref(storage, 'gs://democpp-a3140.appspot.com/images');

  const getReview = async () => {
    const colRef = collection(db, "reviews");
    try {
      const docsSnap = await getDocs(colRef);
      if (docsSnap.docs.length > 0) {
        const reviews = [];
        docsSnap.forEach((doc) => {
          reviews.push(doc.data());
          console.log(doc.data());
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

  const getImage = async () => {
    
      const res = await listAll(storageRef)

  const promises = res.items.map((itemRef) => getDownloadURL(itemRef))
  const data = await Promise.all(promises)
  setImages(data);
  console.log(data)
  };

  useEffect(() => {
    getImage();
  }, []);

  const reviews = results.map((result, index) => {
    const image = allImages[index];
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

  return (
    <>
      <NavBar />
      <Grid templateColumns="repeat(3, 1fr)" spacing={20} px={20}>
        {reviews}
      </Grid>
    </>
  );
}
