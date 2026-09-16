export interface MockLetter {
  id: string;
  from: string;
  fromAddress: string;
  sealedDate: string;
  arrivedDate?: string;
  status: "in-transit" | "arrived" | "read";
  subjectLine: string;
  preview: string;
  body: string[];
  daysRemaining?: number;
}

export const mockLetters: MockLetter[] = [
  {
    id: "l1",
    from: "Reya Chowdhury",
    fromAddress: "DG-3F9X-14",
    sealedDate: "3 March",
    arrivedDate: "6 March",
    status: "read",
    subjectLine: "The garden survived the frost",
    preview: "I know you were worried about the winter jasmine, so I wanted to be the one to tell you—",
    body: [
      "I know you were worried about the winter jasmine, so I wanted to be the one to tell you it survived the frost. Barely, but it did. There's a small green shoot near the base that wasn't there before you left.",
      "The kettle still whistles a half-tone flat, like it's still cross with us about something. I have not fixed it. I think I like the sound too much now.",
      "Write when the ink and the hour agree with you. I am in no hurry.",
    ],
  },
  {
    id: "l2",
    from: "Amit Sengupta",
    fromAddress: "DG-8H2K-77",
    sealedDate: "9 March",
    status: "in-transit",
    daysRemaining: 2,
    subjectLine: "On trains and other slow things",
    preview: "This letter is being written on the 5:40, somewhere between two stations whose names I've already forgotten.",
    body: [
      "This letter is being written on the 5:40, somewhere between two stations whose names I've already forgotten.",
      "I keep thinking about what you said — that the postal network takes its time on purpose. I didn't understand it then. I think I do now.",
    ],
  },
  {
    id: "l3",
    from: "Nadia Islam",
    fromAddress: "DG-1P5T-03",
    sealedDate: "1 March",
    arrivedDate: "5 March",
    status: "arrived",
    subjectLine: "A question I keep forgetting to ask",
    preview: "Do you still keep the window open when it rains, or was that only ever a summer habit?",
    body: [
      "Do you still keep the window open when it rains, or was that only ever a summer habit?",
      "I ask because I caught myself doing it last night and thought of you immediately, which felt unfair to the rain.",
      "Send word when you can. No rush — I know how these things travel.",
    ],
  },
  {
    id: "l4",
    from: "Farhan Ahmed",
    fromAddress: "DG-6Q1M-58",
    sealedDate: "27 February",
    arrivedDate: "2 March",
    status: "read",
    subjectLine: "Notes from the workshop",
    preview: "The bookbinding class finally covered coptic stitching. My hands smell like linen thread.",
    body: [
      "The bookbinding class finally covered coptic stitching. My hands smell like linen thread and I have no complaints about it.",
      "I made a small notebook and I'm sending it separately, the slow way, because I think it deserves the wait.",
    ],
  },
  {
    id: "l5",
    from: "Priya Das",
    fromAddress: "DG-4W7L-29",
    sealedDate: "22 February",
    arrivedDate: "26 February",
    status: "read",
    subjectLine: "Two things I noticed",
    preview: "One: the market moved the fish stalls again. Two: I still think of you every time I pass the tea stand.",
    body: [
      "One: the market moved the fish stalls again, for no reason anyone can explain.",
      "Two: I still think of you every time I pass the tea stand near the old post office — which, considering everything, feels appropriate.",
    ],
  },
];

export const currentAddress = "DG-7K4P-92";
