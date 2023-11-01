"use client";

import imageCompression from "browser-image-compression";
import clsx from "clsx";
import { BlockContent, Text } from "components";
import { useTracking } from "lib/hooks";
import { urlForImage } from "lib/sanity.image";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsArrowRight } from "react-icons/bs";

export function DisplayForm({
  heading,
  description,
  image,
  form,
  backgroundColor,
  sectionId,
}) {
  const [feedback, setFeedback] = useState("");

  const { trackEvent } = useTracking();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!form) return null;

  const backgroundStyle = {
    transparent: "bg-transparent",
    brandLight: "bg-primary-50",
    brandDark: "bg-primary-900 text-white",
    gray: "bg-gray-100",
  };

  const fieldStyle = {
    transparent:
      "w-full flex-1 rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 outline-none focus:bg-white",
    brandDark:
      "w-full flex-1 rounded-lg border border-white bg-white/70 text-black px-4 py-3 outline-none focus:bg-white",
    brandLight:
      "w-full flex-1 rounded-lg border border-gray-300 bg-white/70 px-4 py-3 text-primary outline-none focus:border-primary focus:bg-white",
    gray: "w-full flex-1 rounded-lg border border-gray-300 bg-white/70 px-4 py-3 text-primary outline-none focus:border-primary focus:bg-white",
  };

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
    <section id={sectionId}>
      {heading ? (
        <Text as="h2" size="display" className="mb-6 text-center">
          {heading}
        </Text>
      ) : null}
      {description ? (
        <div className="mx-auto max-w-3xl text-center">
          <BlockContent value={description} />
        </div>
      ) : null}
      <div
        className={clsx(
          "mt-12 flex w-full flex-col overflow-clip rounded-xl lg:flex-row",
          backgroundStyle[backgroundColor]
        )}
      >
        {image ? (
          <div className="relative hidden lg:block lg:w-1/2">
            <Image
              src={urlForImage(image).url()}
              alt={image.alt}
              blurDataURL={image.metadata?.lqip}
              placeholder="blur"
              className={clsx(
                "absolute inset-0 h-full w-full object-cover",
                backgroundColor === "transparent" && "rounded-xl"
              )}
              fill
              unoptimized
            />
          </div>
        ) : null}
        <form
          className={clsx(
            "grid w-full grid-cols-1 items-start gap-5 p-6 md:grid-cols-2 md:p-12",
            image && "lg:w-1/2"
          )}
          onSubmit={handleSubmit(onSubmit)}
        >
          {form.fields.map(
            ({ _key, name, placeholder, type, options, required, width }) => (
              <div
                key={_key}
                className={clsx(
                  "flex flex-col",
                  width === "half" ? "col-span-1" : "col-span-1 md:col-span-2"
                )}
              >
                <label htmlFor={name} className="mb-1 text-sm">
                  {name} {required && <span className="text-red-500">*</span>}
                </label>
                {type === "textarea" && (
                  <textarea
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    className={clsx(
                      fieldStyle[backgroundColor],
                      errors[name] && "border-red-500"
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
                      fieldStyle[backgroundColor],
                      errors[name] && "border-red-500"
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
                      fieldStyle[backgroundColor],
                      errors[name] && "border-red-500"
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
                      fieldStyle[backgroundColor],
                      errors[name] && "border-red-500"
                    )}
                    accept="image/*"
                    multiple
                    {...register(name, { required: required })}
                  />
                )}
              </div>
            )
          )}
          <div className="col-span-1 flex items-center gap-6 md:col-span-2">
            <button
              type="submit"
              className={clsx(
                "group flex w-fit items-center gap-3 rounded-full border px-6 py-3 transition-all ",
                backgroundColor === "brandDark"
                  ? "border-white hover:bg-white/20"
                  : "border-primary-950 bg-primary-950 text-white hover:border-primary-900 hover:bg-primary-900"
              )}
            >
              Send
              <BsArrowRight className="h-5 w-5 group-hover:translate-x-1" />
            </button>
            <Text size="fine" className="w-full text-primary-950">
              {feedback}
            </Text>
          </div>
        </form>
      </div>
    </section>
  );
}
