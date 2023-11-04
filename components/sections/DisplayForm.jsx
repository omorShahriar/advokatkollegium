"use client";

import { cn } from "@/lib/utils";
import imageCompression from "browser-image-compression";
import clsx from "clsx";
import { Text } from "components";
import { useTracking } from "lib/hooks";
import { urlForImage } from "lib/sanity.image";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../elements";

export function DisplayForm({ subHeading, heading, form, email, telephone }) {
  const [feedback, setFeedback] = useState("");

  const { trackEvent } = useTracking();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!form) return null;

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        resolve(result.split(",")[1]);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async function processFiles(files) {
    const maxTotalSize = 10 * 1024 * 1024; // 10MB
    const processedFiles = [];

    let totalSize = 0;

    for (const file of files) {
      if (file instanceof File && file.type.includes("image")) {
        const processedFile = await imageCompression(file, {
          maxSizeMB: 1,
          useWebWorker: true,
        });
        totalSize += processedFile.size;
        processedFiles.push(processedFile);
      }
    }

    if (totalSize > maxTotalSize) {
      throw new Error(
        "Filene du har lastet opp er for store, prøv igjen med mindre filer (under 10MB)."
      );
    }

    try {
      const base64Files = await Promise.all(
        processedFiles.map(async (file) => ({
          content: await fileToBase64(file),
          filename: file.name,
          type: file.type,
          disposition: "attachment",
        }))
      );
      return base64Files;
    } catch (error) {
      setFeedback(error.message);
      return [];
    }
  }

  const onSubmit = async (data) => {
    setFeedback("Sender...");

    try {
      const attachmentList = form.fields
        ?.filter((f) => f.type === "file")
        ?.flatMap((f) => Array.from(data[f.name] || []));

      const attachments = await processFiles(attachmentList);
      const replyTo =
        form.fields
          .filter((f) => f.type === "email")
          ?.map((f) => data[f.name])[0] ?? "";

      await fetch("/api/sendgrid/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: window.location.href,
          subject: form?.name ?? "Skjema",
          recipients: [form.recipient],
          replyTo,
          fields: data,
          attachments,
        }),
      }).then((res) => {
        if (!res.ok) {
          setFeedback("Hmm... Noe gikk galt, prøv igjen senere.");
          throw new Error(res.statusText);
        } else {
          trackEvent("form_submission", { name: form.name, fields: data });
          setFeedback(
            "Takk! Henvendelsen din er sendt, og vi tar kontakt snart."
          );
        }
      });
    } catch (error) {
      setFeedback("Hmm... Noe gikk galt, prøv igjen senere.");
      throw new Error(error);
    }
  };

  return (
    <section className="bg-theme-gray no-style">
      <div className="max-w-content w-full px-4 mx-auto py-24 md:py-32">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-6 max-w-[560px]">
            {subHeading ? (
              <Text as="h3" size="subHeading" className="mb-5 ">
                {subHeading}
              </Text>
            ) : null}
            {heading ? (
              <Text as="h2" size="display" className="mb-6 py-0 ">
                {heading}
              </Text>
            ) : null}
            <div className="flex md:gap-x-16 md:mt-14 mt-12">
              {email ? (
                <div className="flex flex-col gap-1">
                  <Text className=" text-xl">E-post</Text>
                  <a
                    href={`mailto:${email}`}
                    className="font-semibold text-2xl"
                  >
                    {email}
                  </a>
                </div>
              ) : null}
              {telephone ? (
                <div className="flex flex-col gap-1">
                  <Text className=" text-xl">Telefon</Text>
                  <a
                    href={`tel:${telephone}`}
                    className="font-semibold text-2xl"
                  >
                    {telephone}
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          <div className={cn("col-span-6 bg-white px-14 py-20")}>
            <form
              className={"flex flex-col gap-y-6"}
              onSubmit={handleSubmit(onSubmit)}
            >
              {form.fields.map(
                ({
                  _key,
                  name,
                  placeholder,
                  type,
                  options,
                  required,
                  width,
                }) => (
                  <div key={_key} className={clsx("flex flex-col")}>
                    <label htmlFor={name} className="mb-2 font-medium">
                      {name}{" "}
                      {required && <span className="text-red-500">*</span>}
                    </label>
                    {type === "textarea" && (
                      <textarea
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        className={clsx(
                          errors[name] && "border-red-500",
                          "p-6 bg-theme-gray"
                        )}
                        rows={4}
                        {...register(name, { required: required })}
                      />
                    )}
                    {type === "select" && (
                      <select
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        className={clsx(
                          errors[name] && "border-red-500",
                          "p-6 bg-theme-gray"
                        )}
                        {...register(name, { required: required })}
                      >
                        {options.map(({ _key, label, value }) => (
                          <option key={_key} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    )}
                    {type === "checkbox" && (
                      <div className="flex flex-col">
                        {options.map(({ _key, label, value }) => (
                          <div key={_key} className="mb-2 flex items-center">
                            <input
                              type={type}
                              id={_key}
                              name={name}
                              value={value}
                              className={clsx(
                                "mr-2",
                                errors[name] && "border-red-500"
                              )}
                              {...register(name, { required: required })}
                            />
                            <label htmlFor={_key}>{label}</label>
                          </div>
                        ))}
                      </div>
                    )}
                    {(type === "text" ||
                      type === "email" ||
                      type === "tel" ||
                      type === "number" ||
                      type === "date" ||
                      type === "time") && (
                      <input
                        type={type}
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        className={clsx(
                          errors[name] && "border-red-500",
                          "p-6 bg-theme-gray"
                        )}
                        {...register(name, { required: required })}
                      />
                    )}
                    {type === "file" && (
                      <input
                        type="file"
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        className={clsx(
                          errors[name] && "border-red-500",
                          "p-6 bg-theme-gray"
                        )}
                        accept="image/*"
                        multiple
                        {...register(name, { required: required })}
                      />
                    )}
                  </div>
                )
              )}
              <div className=" flex flex-col items-center gap-6 mt-8 ">
                <button
                  type="submit"
                  className="bg-theme-blue group  w-full text-center items-center border px-12 py-4 transition-all font-semibold   uppercase text-white border-theme-blue hover:bg-theme-blue/90 hover:border-theme-blue/90"
                >
                  Send
                </button>
                <Text size="fine" className="w-full text-primary-950">
                  {feedback}
                </Text>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
