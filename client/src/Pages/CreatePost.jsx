import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import React from "react";

export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          ></TextInput>
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            <option value="fashion">Fashion</option>
            <option value="News">News</option>
            <option value="other">Others</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            className="bg-gradient-to-r from-red-500 to-purple-500 p-5"
            size="sm"
            outline
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write your post"
          className="h-72 mb-12"
          required
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-purple-500"
        >
          Publish
        </Button>
      </form>
    </div>
  );
}
