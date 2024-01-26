import React, { useEffect, useRef } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function FAQ() {
  const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            ref.current?.style.setProperty("opacity", "1");
            ref.current?.style.setProperty("scale", "1");
          } else {
            ref.current?.style.setProperty("opacity", "0.01");
            ref.current?.style.setProperty("scale", "0.9");
          }
        },
        { threshold: 0.4 }
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref]);
  };
  const FAQ_ITEMS = [
    {
      id: 0,
      query: "What is GAMEXPAD?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, necessitatibus delectus! Ad aspernatur rerum velit sunt nihil. Eius ullam, esse accusantium nesciunt quas id excepturi repellat totam, odio laborum minus quaerat, consequuntur aperiam illo iure ipsam doloremque quo amet incidunt soluta asperiores assumenda beatae blanditiis. Voluptas animi accusantium tempora necessitatibus!      ",
    },
    {
      id: 1,
      query: "What is GAMEXPAD?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, necessitatibus delectus! Ad aspernatur rerum velit sunt nihil. Eius ullam, esse accusantium nesciunt quas id excepturi repellat totam, odio laborum minus quaerat, consequuntur aperiam illo iure ipsam doloremque quo amet incidunt soluta asperiores assumenda beatae blanditiis. Voluptas animi accusantium tempora necessitatibus!      ",
    },
    {
      id: 2,
      query: "What is GAMEXPAD?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, necessitatibus delectus! Ad aspernatur rerum velit sunt nihil. Eius ullam, esse accusantium nesciunt quas id excepturi repellat totam, odio laborum minus quaerat, consequuntur aperiam illo iure ipsam doloremque quo amet incidunt soluta asperiores assumenda beatae blanditiis. Voluptas animi accusantium tempora necessitatibus!      ",
    },
    {
      id: 3,
      query: "What is GAMEXPAD?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, necessitatibus delectus! Ad aspernatur rerum velit sunt nihil. Eius ullam, esse accusantium nesciunt quas id excepturi repellat totam, odio laborum minus quaerat, consequuntur aperiam illo iure ipsam doloremque quo amet incidunt soluta asperiores assumenda beatae blanditiis. Voluptas animi accusantium tempora necessitatibus!      ",
    },
  ];
  const FAQ_ITEMS_2 = [
    {
      id: 4,
      query: "What is GAMEXPAD?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, necessitatibus delectus! Ad aspernatur rerum velit sunt nihil. Eius ullam, esse accusantium nesciunt quas id excepturi repellat totam, odio laborum minus quaerat, consequuntur aperiam illo iure ipsam doloremque quo amet incidunt soluta asperiores assumenda beatae blanditiis. Voluptas animi accusantium tempora necessitatibus!      ",
    },
    {
      id: 5,
      query: "What is GAMEXPAD?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, necessitatibus delectus! Ad aspernatur rerum velit sunt nihil. Eius ullam, esse accusantium nesciunt quas id excepturi repellat totam, odio laborum minus quaerat, consequuntur aperiam illo iure ipsam doloremque quo amet incidunt soluta asperiores assumenda beatae blanditiis. Voluptas animi accusantium tempora necessitatibus!      ",
    },
    {
      id: 6,
      query: "What is GAMEXPAD?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, necessitatibus delectus! Ad aspernatur rerum velit sunt nihil. Eius ullam, esse accusantium nesciunt quas id excepturi repellat totam, odio laborum minus quaerat, consequuntur aperiam illo iure ipsam doloremque quo amet incidunt soluta asperiores assumenda beatae blanditiis. Voluptas animi accusantium tempora necessitatibus!      ",
    },
    {
      id: 7,
      query: "What is GAMEXPAD?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, necessitatibus delectus! Ad aspernatur rerum velit sunt nihil. Eius ullam, esse accusantium nesciunt quas id excepturi repellat totam, odio laborum minus quaerat, consequuntur aperiam illo iure ipsam doloremque quo amet incidunt soluta asperiores assumenda beatae blanditiis. Voluptas animi accusantium tempora necessitatibus!      ",
    },
  ];

  const divRef = useRef<HTMLDivElement>(null);
  const divRef1 = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);
  const divRef3 = useRef<HTMLDivElement>(null);
  const divRef4 = useRef<HTMLDivElement>(null);
  const divRef5 = useRef<HTMLDivElement>(null);
  const divRef6 = useRef<HTMLDivElement>(null);
  const divRef7 = useRef<HTMLDivElement>(null);
  const divRef8 = useRef<HTMLDivElement>(null);

  useIntersectionObserver(divRef);
  useIntersectionObserver(divRef1);
  useIntersectionObserver(divRef2);
  useIntersectionObserver(divRef3);
  useIntersectionObserver(divRef4);
  useIntersectionObserver(divRef5);
  useIntersectionObserver(divRef6);
  useIntersectionObserver(divRef7);
  useIntersectionObserver(divRef8);

  return (
    <>
      <div className="flex flex-col gap-12 justify-center items-center pb-24">
        <div
          ref={divRef}
          style={{
            opacity: "0.01",
            scale: "0.9",
            transition: "scale 1s, opacity 1s",
          }}
          className="flex flex-col items-center justify-center text-center text-white gap-2">
          <p className=" font-SpaceGro sm:text-3xl md:text-3xl xl:text-5xl text-white z-10">
            FAQ
          </p>
          <p>The Most Common Questions</p>
        </div>
        <div className="flex w-full xl:flex-row md:flex-col sm:flex-col justify-between">
          <div className="h-full flex flex-col xl:justify-start md:justify-center sm:justify-center  xl:w-1/2 sm:w-full md:w-full rounded-lg">
            <div
              ref={divRef1}
              style={{
                opacity: "0.01",
                scale: "0.9",
                transition: "scale 1s, opacity 1s",
              }}
              className="  text-white/75 p-4 gap-2 flex flex-col">
              <Accordion
                variant="light"
                showDivider={false}
                itemClasses={{
                  base: "w-full py-2",
                  heading:
                    " data-[open=true]:bg-dark-gray  bg-dark-gray px-4 py-2 rounded",
                  indicator: " text-white data-[open=true]:text-white",
                  content: "px-3 rounded mt-2 bg-dark text-[#9d9d9d]",
                  trigger: "mt-2",
                  title: " text-white text-sm data-[open=true]:text-white",
                }}>
                {FAQ_ITEMS.map((item) => (
                  <AccordionItem
                    key={"key" + item.id.toString()}
                    title={item.query}>
                    <div>{item.answer}</div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <div className="h-full md:flex sm:hidden flex-col xl:w-1/2 md:w-full sm:w-full rounded-lg">
            <div
              ref={divRef2}
              style={{
                opacity: "0.01",
                scale: "0.9",
                transition: "scale 1s, opacity 1s",
              }}
              className="  text-white/75 p-4 gap-2 flex flex-col">
              <Accordion
                variant="light"
                showDivider={false}
                itemClasses={{
                  base: "w-full py-2",
                  heading:
                    " data-[open=true]:bg-dark-gray  bg-dark-gray px-4 py-2 rounded",
                  indicator: " text-white data-[open=true]:text-white",
                  content: "px-3 rounded mt-2 bg-dark text-[#9d9d9d]",
                  trigger: "mt-2",
                  title: " text-white text-sm data-[open=true]:text-white",
                }}>
                {FAQ_ITEMS_2.map((item) => (
                  <AccordionItem
                    key={"key" + item.id.toString()}
                    title={item.query}>
                    <div>{item.answer}</div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
