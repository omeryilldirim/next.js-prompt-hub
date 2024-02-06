"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "../../components/Form";

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    header: "",
    tags: [],
    userId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      return;
    }
    setIsSubmitting(true);
    try {
      const data = {
        prompt: post.prompt,
        header: post.header,
        tags: post.tags,
        userId: session?.user?.id,
      };
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setIsSubmitting(false);
      if (response.ok) {
        router?.push(`/`);
        // router.push(`/profile/${data.userId}`);
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreatePrompt;