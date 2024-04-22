import React from "react";
// import Markdown from "./markdown";
import { Bot, User2 } from "lucide-react";
import { Message } from "ai/react";
import MessageBox from "./messagebox";

type Props = {
  messages: Message[];
  isLoading: boolean;
};

const Messages = ({ messages, isLoading }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((m, index) => {
        return <MessageBox key={index} role={m.role} content={m.content}/>;
      })}
    </div>
  );
};

export default Messages;


const dummyText=`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod turpis eget posuere facilisis. Mauris dapibus ante a sem varius tincidunt. Nulla sodales faucibus ante ac ornare. In urna magna, euismod eget lobortis a, dapibus et ipsum. Mauris eu blandit nisi. Maecenas in velit sed libero convallis egestas. Fusce fermentum tortor vel metus sodales vehicula.

Aliquam tempor, mi varius cursus tincidunt, metus nisi accumsan nisi, non rhoncus velit ante nec odio. Aliquam erat volutpat. Nulla molestie elementum metus a tempus. Ut suscipit, dolor quis lacinia pulvinar, tortor magna scelerisque augue, a tincidunt ligula velit molestie nisl. Pellentesque eget tempor lacus. Vestibulum vestibulum lorem id congue suscipit. Vestibulum at sem quis leo porttitor rhoncus. Duis semper sodales neque, quis gravida justo accumsan vitae.

Nam at est auctor, scelerisque tortor id, fringilla ante. Etiam in venenatis urna, et semper sem. Cras tempus pharetra feugiat. In id vulputate erat. Vivamus vel rhoncus eros. Integer hendrerit elit ut mauris vestibulum dapibus. Praesent sit amet nisi eu nibh laoreet varius. Ut rhoncus dictum semper. Etiam bibendum gravida orci id sollicitudin. Ut a laoreet metus, sit amet commodo quam. Proin nisi sapien, vestibulum sit amet purus ac, luctus feugiat odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit a leo vitae rutrum. Nullam sed iaculis nunc, et facilisis nulla.

Curabitur auctor sed purus id porta. Quisque lacinia ligula eros, et ornare dui porta id. Quisque ullamcorper nisi elit, et scelerisque nunc efficitur nec. Donec in libero hendrerit, tempus dui quis, luctus nibh. Integer ullamcorper sem ut lectus tempus, id iaculis tortor gravida. Vivamus eu maximus justo. Aliquam ut justo quis tortor blandit tristique at a arcu. Mauris fringilla, enim quis rhoncus blandit, neque augue fringilla dui, sed pulvinar diam lorem vitae justo. Integer tempor libero nec ligula eleifend condimentum. Vestibulum ac egestas tortor, a venenatis sapien. Etiam auctor, lectus ut laoreet malesuada, augue nisi facilisis neque, eget tincidunt quam dui eget elit. Nulla vitae metus ut elit tempor eleifend at in lacus. Fusce consectetur nec purus sit amet consectetur. Vivamus congue, diam id fermentum fermentum, justo purus sodales nisl, sed elementum lacus diam at risus. Nam ac finibus velit. Curabitur purus est, dignissim vitae sapien id, lobortis accumsan elit.

Suspendisse placerat nulla eget neque feugiat tristique. Maecenas sit amet nibh cursus, ornare magna vitae, finibus ex. Suspendisse dui sapien, facilisis sit amet lobortis in, sollicitudin sed erat. In id magna sed dolor hendrerit faucibus. Vivamus malesuada eros non velit fringilla malesuada. Sed congue luctus ultrices. Vivamus dictum pharetra lacus, sed elementum enim molestie vitae. Mauris at ipsum nec turpis varius porta. Proin consequat elit hendrerit elit pellentesque blandit.

Aenean dictum tincidunt leo eget ultricies. Nunc quis est erat. Donec sit amet pulvinar massa, eget convallis nulla. Proin mauris lorem, posuere in diam non, volutpat blandit metus. Fusce commodo arcu tincidunt, sollicitudin tortor in, laoreet ante. Nunc rhoncus metus non libero rhoncus, id molestie enim mollis. Etiam felis enim, consectetur nec fermentum interdum, ultrices sed tortor. Donec in est lectus. Vestibulum scelerisque at leo ut convallis.

Ut quis pretium dui. Sed at venenatis massa. Donec dapibus ut ligula vitae mollis. Phasellus vitae magna ac nibh convallis euismod sit amet sit amet erat. Suspendisse justo urna, convallis id sapien ut, congue tempus diam. Vestibulum a sodales augue, a dignissim ante. Quisque porta orci et laoreet malesuada. Nullam id neque vitae risus congue ultricies. Praesent vel nisl tellus. Quisque odio sapien, pharetra a ante sit amet, hendrerit vulputate lorem. Praesent porttitor pharetra purus. Nunc eget mi pharetra, lacinia purus non, congue ligula. Phasellus interdum suscipit tellus. Suspendisse in maximus metus. Ut eget posuere urna. Quisque congue lobortis est luctus elementum.

Fusce cursus sapien a lectus congue sodales. Praesent fringilla odio eu semper varius. Integer egestas quis nulla a finibus. In nec consectetur augue. Quisque viverra cursus efficitur. Nunc sollicitudin purus magna, id iaculis arcu consequat sit amet. Duis eu porttitor sapien. Fusce eu ultricies leo. In blandit nulla id facilisis porttitor. Vivamus scelerisque tempus enim nec maximus. Aenean tincidunt mauris fermentum tempus egestas. Nullam luctus, tellus id tristique facilisis, lorem magna viverra nisl, in tincidunt nunc velit vel leo. Nunc accumsan, leo consectetur tincidunt cursus, sem dolor interdum libero, nec ultricies tellus sapien quis mi. Nunc ac aliquet nisi, a rutrum ante. Donec lorem leo, posuere vitae rutrum ut, consectetur non neque. Etiam eget eros egestas, elementum dui non, varius eros.

Curabitur id eleifend nunc, ut iaculis turpis. Nam mattis placerat lacinia. In malesuada congue finibus. Curabitur semper justo sed sem lacinia eleifend. Phasellus magna augue, facilisis quis aliquet sed, lobortis id est. In hac habitasse platea dictumst. Nullam tempus est accumsan, vulputate erat eu, ultrices purus.

Integer sit amet dolor at velit gravida tincidunt. Nulla id luctus felis, sed mollis justo. Suspendisse potenti. Nulla in velit eget nisl tempor mollis a sit amet lectus. Mauris at felis luctus, pellentesque nulla quis, tempus dui. Sed mattis turpis eros. Aliquam commodo pellentesque lorem, ut suscipit risus scelerisque eget. Phasellus consectetur dui ornare dictum venenatis. Nam dui urna, placerat a lacus vitae, porta mollis diam. Fusce maximus elementum lectus, facilisis euismod lorem ornare commodo. Nam quis vulputate turpis, in malesuada est. Sed elementum eu augue ut rhoncus.`