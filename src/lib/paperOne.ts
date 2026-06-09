import type { QuestionItem } from "@/lib/types";

export const paperOneQuestions: QuestionItem[] = [
  {
    id: "paper1-q1",
    title: "第1题 样本数据中位数",
    type: "single",
    score: 5,
    prompt: String.raw`样本数据 $6, 8, 4, 5, 12$ 的中位数为`,
    options: [String.raw`$5$`, String.raw`$6$`, String.raw`$8$`, String.raw`$9$`],
    referenceAnswer: "B",
    scoringRubric: "单选题，判断中位数计算是否正确。",
    tags: ["第一卷", "选择题", "统计"],
    difficulty: "基础",
  },
  {
    id: "paper1-q2",
    title: "第2题 平面向量系数判断",
    type: "single",
    score: 5,
    prompt: String.raw`已知平面向量 $a$，$b$ 不共线，且 $2a + yb = xa - 3b$，则`,
    options: [
      String.raw`$x = 2$，$y = -3$`,
      String.raw`$x = -2$，$y = 3$`,
      String.raw`$x = 2$，$y = 3$`,
      String.raw`$x = -2$，$y = -3$`,
    ],
    referenceAnswer: "A",
    scoringRubric: "单选题，依据向量基本定理比较对应系数。",
    tags: ["第一卷", "选择题", "向量"],
    difficulty: "基础",
  },
  {
    id: "paper1-q3",
    title: "第3题 集合交集",
    type: "single",
    score: 5,
    prompt: String.raw`已知集合 $A = \left\{\sin\frac{7\pi}{6}, \cos\frac{5\pi}{3}, \tan\frac{5\pi}{4}\right\}$，$B = \left\{-\frac{\sqrt{3}}{2}, -\frac{1}{2}, 1\right\}$，则 $A \cap B =$`,
    options: [
      String.raw`$\left\{-\frac{\sqrt{3}}{2}, \frac{1}{2}\right\}$`,
      String.raw`$\left\{-\frac{\sqrt{3}}{2}, 1\right\}$`,
      String.raw`$\left\{-\frac{1}{2}, 1\right\}$`,
      String.raw`$\left\{-\frac{\sqrt{3}}{2}, -\frac{1}{2}, 1\right\}$`,
    ],
    referenceAnswer: "C",
    scoringRubric: "单选题，先求三角函数值，再求集合交集。",
    tags: ["第一卷", "选择题", "集合"],
    difficulty: "基础",
  },
  {
    id: "paper1-q4",
    title: "第4题 切线方程",
    type: "single",
    score: 5,
    prompt: String.raw`曲线 $y = 5x + 8\ln x$ 在点 $(1, 5)$ 处的切线方程为`,
    options: [
      String.raw`$y = 3x + 2$`,
      String.raw`$y = 5x$`,
      String.raw`$y = 8x - 3$`,
      String.raw`$y = 13x - 8$`,
    ],
    referenceAnswer: "D",
    scoringRubric: "单选题，求导并代入切点写出切线方程。",
    tags: ["第一卷", "选择题", "导数"],
    difficulty: "基础",
  },
  {
    id: "paper1-q5",
    title: "第5题 抛物线焦点距离",
    type: "single",
    score: 5,
    prompt: String.raw`已知抛物线 $C_1: y^2 = 2p_1x \, (p_1 > 0)$ 和 $C_2: x^2 = 2p_2y \, (p_2 > 0)$ 均经过点 $(4, 8)$，则 $C_1$ 的焦点与 $C_2$ 的焦点之间的距离为`,
    options: [
      String.raw`$12$`,
      String.raw`$4\sqrt{5}$`,
      String.raw`$6$`,
      String.raw`$\frac{\sqrt{65}}{2}$`,
    ],
    referenceAnswer: "D",
    scoringRubric: "单选题，根据过点条件求参数，再求两焦点间距离。",
    tags: ["第一卷", "选择题", "圆锥曲线"],
    difficulty: "中等",
  },
  {
    id: "paper1-q6",
    title: "第6题 函数最值参数",
    type: "single",
    score: 5,
    prompt: String.raw`已知函数 $f(x) = \frac{x+2}{e^x+a}$ 的最大值为 $1$，则 $a =$`,
    options: [String.raw`$\frac{1}{2}$`, String.raw`$1$`, String.raw`$\frac{3}{2}$`, String.raw`$2$`],
    referenceAnswer: "B",
    scoringRubric: String.raw`单选题，利用最大值条件建立参数方程。`,
    tags: ["第一卷", "选择题", "导数", "最值"],
    difficulty: "中等",
  },
  {
    id: "paper1-q7",
    title: "第7题 一百零八塔分组",
    type: "single",
    score: 5,
    prompt: String.raw`一百零八塔共有 $108$ 座塔，依山势自上而下排列成 $12$ 行。记第 $i$ 行塔座数为 $a_i$，其中 $a_1 = 1$，$a_2 = a_3 = 3$，$a_4 = a_5 = 5$，且 $a_6, a_7, a_8, \dots, a_{12}$ 是一个首项为 $7$、公差为 $2$ 的等差数列。将 $a_1, a_2, \dots, a_{12}$ 分为 $6$ 组，每组 $2$ 个数，使得每组的 $2$ 个数之和可构成一个项数为 $6$ 且公差为 $d(d > 0)$ 的等差数列，则 $d =$`,
    options: [String.raw`$2$`, String.raw`$4$`, String.raw`$6$`, String.raw`$8$`],
    referenceAnswer: "B",
    scoringRubric: "单选题，整理数列后分析分组和形成的等差数列。",
    tags: ["第一卷", "选择题", "数列"],
    difficulty: "中等",
  },
  {
    id: "paper1-q8",
    title: "第8题 离散点集数学期望",
    type: "single",
    score: 5,
    prompt: String.raw`设 $U = \{(x_1, x_2, x_3) \mid x_i \in \{-2, -1, 1, 2\}, i=1, 2, 3\}$ 为空间中 $64$ 个点构成的集合，点 $P(1, 1, 1)$。记样本空间 $\Omega = U \setminus \{P\}$，从 $\Omega$ 中随机取一个点，定义随机变量 $X$ 如下：对 $\Omega$ 中的每个点 $A(x_1, x_2, x_3)$，令 $X(A) = x_1 + x_2 + x_3$，则 $X$ 的数学期望为`,
    options: [
      String.raw`$-\frac{1}{21}$`,
      String.raw`$-\frac{1}{63}$`,
      String.raw`$0$`,
      String.raw`$\frac{1}{7}$`,
    ],
    referenceAnswer: "A",
    scoringRubric: "单选题，利用对称性并考虑去掉点 P 后的修正。",
    tags: ["第一卷", "选择题", "概率统计"],
    difficulty: "中等",
  },
  {
    id: "paper1-q9",
    title: "第9题 复数性质",
    type: "multiple",
    score: 6,
    prompt: String.raw`设 $z = 3 + 2\mathrm{i}$，则`,
    options: [
      String.raw`$\bar{z} = 3 - 2\mathrm{i}$`,
      String.raw`$|z| = 5$`,
      String.raw`$z^2 = 5 + 12\mathrm{i}$`,
      String.raw`$\frac{z+3}{z-\mathrm{i}} \in \mathbb{R}$`,
    ],
    referenceAnswer: "ACD",
    scoringRubric: "多选题，判断每个选项是否成立，全部选对满分，部分选对得部分分。",
    tags: ["第一卷", "多选题", "复数"],
    difficulty: "基础",
  },
  {
    id: "paper1-q10",
    title: "第10题 空间几何关系判断",
    type: "multiple",
    score: 6,
    prompt: String.raw`在空间中，$A$、$B$ 为两个定点，动点 $C$ 到直线 $AB$ 的距离为 $2$，动点 $D$ 到直线 $AB$ 的距离为 $1$。若二面角 $C-AB-D$ 为 $60^\circ$，则`,
    options: [
      String.raw`$\angle CAD \ge 60^\circ$`,
      String.raw`$CD \ge \sqrt{3}$`,
      String.raw`当 $AB \perp CD$ 时，$CD \perp$ 平面 $ABD$`,
      String.raw`当 $AB \perp$ 平面 $ACD$ 时，$AC \perp AD$`,
    ],
    referenceAnswer: "BC",
    scoringRubric: "多选题，结合空间向量或截面法判断选项真伪。",
    tags: ["第一卷", "多选题", "立体几何"],
    difficulty: "中等",
  },
  {
    id: "paper1-q11",
    title: "第11题 三圆与截弦",
    type: "multiple",
    score: 6,
    prompt: String.raw`已知圆 $C_1: (x+1)^2+y^2=1$，圆 $C_2: (x-1)^2+y^2=1$，圆 $C_3: x^2+(y-\sqrt{3})^2=1$。直线 $l: y=kx+b$ 与 $C_1$、$C_2$、$C_3$ 均有两个交点，记 $l$ 被 $C_1$、$C_2$、$C_3$ 截得的弦长分别为 $s_1, s_2, s_3$。则`,
    options: [
      String.raw`$k$ 可以取任意实数`,
      String.raw`满足 $s_1=s_2=s_3$ 的直线 $l$ 共有 $3$ 条`,
      String.raw`满足 $s_1+s_2+s_3=3$ 的直线 $l$ 多于 $3$ 条`,
      String.raw`当 $b=0$ 时，$s_1+s_2+s_3$ 的最大值为 $\frac{2\sqrt{21}}{3}$`,
    ],
    referenceAnswer: "BCD",
    scoringRubric: "多选题，利用圆心到直线距离与弦长公式分析。",
    tags: ["第一卷", "多选题", "解析几何"],
    difficulty: "较难",
  },
  {
    id: "paper1-q12",
    title: "第12题 双曲线离心率",
    type: "short",
    score: 5,
    prompt: String.raw`双曲线 $5x^2 - 6y^2 = 1$ 的离心率为 $\underline{\qquad\qquad}$。`,
    referenceAnswer: String.raw`$\frac{\sqrt{66}}{6}$`,
    scoringRubric: "填空题，化为标准方程后求离心率。",
    tags: ["第一卷", "填空题", "圆锥曲线"],
    difficulty: "基础",
  },
  {
    id: "paper1-q13",
    title: "第13题 三角函数性质",
    type: "short",
    score: 5,
    prompt: String.raw`已知 $f(x) = 2\sin(ax+\theta)$，其中 $a \in \mathbb{Z}$，$0 \le \theta < 2\pi$，是偶函数，且 $f(x)$ 在区间 $\left(0, \frac{\pi}{2}\right)$ 单调递增，则 $\theta = \underline{\qquad\qquad}$，$f\left(\frac{2\pi}{3}\right) = \underline{\qquad\qquad}$。`,
    referenceAnswer: String.raw`$\frac{3\pi}{2};\ 1$`,
    scoringRubric: "填空题，满分5分。第一空2分，第二空3分，结合偶函数与单调性确定参数后求函数值。",
    tags: ["第一卷", "填空题", "三角函数"],
    difficulty: "中等",
  },
  {
    id: "paper1-q14",
    title: "第14题 数列与等比项",
    type: "short",
    score: 5,
    prompt: String.raw`设实数 $q$ 满足：存在数列 $\{a_n\}$，使得对于任意 $n \in \mathbb{N}^*$，均有 $a_1 + a_2 + \cdots + a_{3n} = n^2 + n$，且 $\{a_n\}$ 中有某些项 $a_{i_1}, a_{i_2}, \cdots, a_{i_9}$ 是公比为 $q$ 的等比数列，则 $q$ 的最大值为 $\underline{\qquad\qquad}$。`,
    referenceAnswer: String.raw`$\sqrt[3]{\frac{3}{2}}$`,
    scoringRubric: "填空题，先由部分和求通项，再分析 9 项等比子列的最大公比。",
    tags: ["第一卷", "填空题", "数列"],
    difficulty: "较难",
  },
  {
    id: "paper1-q15",
    title: "第15题 直三棱柱中的平行与距离",
    type: "essay",
    score: 13,
    prompt: String.raw`在直三棱柱 $ABC-A_1B_1C_1$ 中，$\angle ACB = 90^\circ$，$AC = BC$，$D$、$E$ 分别为 $AB$、$AC_1$ 的中点。

$(1)$ 证明：$DE \parallel$ 平面 $BCC_1B_1$；

$(2)$ 设 $CC_1 = 2$，直线 $DE$ 与平面 $ACC_1A_1$ 所成的角为 $45^\circ$，求直线 $DE$ 到平面 $BCC_1B_1$ 的距离。`,
    referenceAnswer: String.raw`$(1)$ 取 $CC_1$ 中点 $F$， $BC$ 中点 $G$，连接 $EF$, $FG$, $DG$。
在 $\triangle ACC_1$ 中， $E$, $F$ 为 $AC_1$, $CC_1$ 中点，所以 $EF \parallel AC$, $EF = \frac{1}{2} AC$。
在 $\triangle ABC$ 中， $D$, $G$ 为 $AB$, $BC$ 中点，所以 $DG \parallel AC$, $DG = \frac{1}{2} AC$。
所以 $EF \parallel DG$, $EF = DG$，四边形 $EDGF$ 为平行四边形，所以 $DE \parallel FG$。
因为 $FG \subset \text{平面 } BCC_1B_1$, $DE \not\subset \text{平面 } BCC_1B_1$。所以 $DE \parallel \text{平面 } BCC_1B_1$。

$(2)$ 取 $AC$ 中点 $H$，连接 $DH$, $EH$。因为 $D$, $H$ 为 $AB$, $AC$ 中点，所以 $DH \parallel BC$。
因为直三棱柱 $ABC-A_1B_1C_1$，所以 $CC_1 \perp \text{平面 } ABC$。
因为 $BC \subset \text{平面 } ABC$，所以 $CC_1 \perp BC$。因为 $\angle ACB = 90^\circ$，所以 $AC \perp BC$。
因为 $AC \cap CC_1 = C$，所以 $BC \perp \text{平面 } ACC_1A_1$，所以 $DH \perp \text{平面 } ACC_1A_1$。
点 $D$ 在平面 $ACC_1A_1$ 的垂足为 $H$，直线 $DE$ 与平面 $ACC_1A_1$ 所成角为 $45^\circ$。
在 $\triangle ACC_1$ 中， $EH$ 为中位线，所以 $EH = \frac{1}{2} CC_1 = 1$。
在 $\text{Rt}\triangle DHE$ 中， $DH \perp EH$，所以 $DH = EH \tan 45^\circ = 1$。
因为 $AC = BC$，且 $BC = 2DH = 2$，所以 $AC = BC = 2$。
因为 $DE \parallel \text{平面 } BCC_1B_1$，所以直线 $DE$ 到平面 $BCC_1B_1$ 的距离等价于点 $D$ 到平面 $BCC_1B_1$ 的距离。
因为 $DG \parallel AC$，同理 $AC \perp \text{平面 } BCC_1B_1$。
因为 $DG \not\subset \text{平面 } BCC_1B_1$，所以 $DG \perp \text{平面 } BCC_1B_1$。
所以 $DG = \frac{1}{2} AC = 1$，故直线 $DE$ 到平面 $BCC_1B_1$ 的距离为 $1$。`,
    scoringRubric: "共13分。需要写出完整证明、几何关系分析和距离计算步骤。",
    tags: ["第一卷", "解答题", "立体几何"],
    difficulty: "中等",
  },
  {
    id: "paper1-q16",
    title: "第16题 三角形求角与长度",
    type: "essay",
    score: 15,
    prompt: String.raw`已知在 $\triangle ABC$ 中，$AB = 3$，$BC = 2\sqrt{3}$，$\cos B = \frac{\sqrt{3}}{3}$。

$(1)$ 求 $\cos A$；

$(2)$ 设 $D$、$E$ 两点满足：$D$ 在 $BA$ 的延长线上，$DE \parallel BC$，$AE \perp AC$。若 $DE = \sqrt{6}$，求 $CE$。`,
    referenceAnswer: String.raw`$(1)$ 在 $\triangle ABC$ 中， $AC^2 = AB^2 + BC^2 - 2AB \cdot BC \cos B = 9 + 12 - 2 \times 3 \times 2\sqrt{3} \times \frac{\sqrt{3}}{3} = 9$，
所以 $AC = 3$。
则 $\cos A = \frac{AB^2 + AC^2 - BC^2}{2AB \cdot AC} = \frac{9 + 9 - 12}{2 \times 3 \times 3} = \frac{1}{3}$。

$(2)$ 设 $\overrightarrow{AD} = -\lambda \overrightarrow{AB} (\lambda > 0)$。因为 $DE \parallel BC$，设 $\overrightarrow{DE} = \mu \overrightarrow{BC}$。
因为 $\overrightarrow{AE} = \overrightarrow{AD} + \overrightarrow{DE} = -\lambda \overrightarrow{AB} + \mu (\overrightarrow{AC} - \overrightarrow{AB}) = -(\lambda + \mu) \overrightarrow{AB} + \mu \overrightarrow{AC}$。
又 $AE \perp AC$，所以 $\overrightarrow{AE} \cdot \overrightarrow{AC} = 0$， $-(\lambda + \mu) \overrightarrow{AB} \cdot \overrightarrow{AC} + \mu \overrightarrow{AC}^2 = 0$。
因为 $\overrightarrow{AB} \cdot \overrightarrow{AC} = 3 \times 3 \times \frac{1}{3} = 3$， $\overrightarrow{AC}^2 = 9$，所以 $-3(\lambda + \mu) + 9\mu = 0$， $\lambda = 2\mu$。
因为 $\lambda > 0$，所以 $\mu > 0$。
因为 $|\overrightarrow{DE}| = \mu |\overrightarrow{BC}|$，所以 $\sqrt{6} = 2\sqrt{3}\mu$， $\mu = \frac{\sqrt{2}}{2}$。
$\overrightarrow{AE} = -\frac{3\sqrt{2}}{2} \overrightarrow{AB} + \frac{\sqrt{2}}{2} \overrightarrow{AC}$， $\overrightarrow{CE} = \overrightarrow{AE} - \overrightarrow{AC} = -\frac{3\sqrt{2}}{2} \overrightarrow{AB} + \left(\frac{\sqrt{2}}{2} - 1\right)\overrightarrow{AC}$，
$\overrightarrow{CE}^2 = \frac{9}{2}\overrightarrow{AB}^2 + \left(\frac{\sqrt{2}}{2} - 1\right)^2\overrightarrow{AC}^2 - 3\sqrt{2}\left(\frac{\sqrt{2}}{2} - 1\right)\overrightarrow{AB} \cdot \overrightarrow{AC} = 45$，
$CE = 3\sqrt{5}$。`,
    scoringRubric: "共15分。需写出余弦定理、相似或解析过程及长度计算。",
    tags: ["第一卷", "解答题", "解三角形"],
    difficulty: "中等",
  },
  {
    id: "paper1-q17",
    title: "第17题 投篮停止次数的概率模型",
    type: "essay",
    score: 15,
    prompt: String.raw`设整数 $N \ge 2$。某同学用一个球进行投篮练习，至多投篮 $N$ 次。当且仅当投中 $1$ 次或 $N$ 次均未投中时，停止练习。设该同学每次投中的概率为 $p(0 < p < 1)$，各次投中与否相互独立。记 $X$ 为停止练习时该同学的投篮次数。

$(1)$ 当 $N = 4,\; p = \frac{1}{3}$ 时，求 $X$ 的分布列；

$(2)$ 设 $k,m$ 均为自然数。

$(i)$ 当 $k \le N - 1$ 时，求 $P(X > k)$；

$(ii)$ 当 $k + m \le N - 1$ 时，证明：$P(X > k + m \mid X > k) = P(X > m)$。`,
    referenceAnswer: String.raw`$(1)$ $X=1,\ 2,\ 3,\ 4$。
$P(X=1) = p = \frac{1}{3}$，
$P(X=2) = (1-p)p = \frac{2}{3} \times \frac{1}{3} = \frac{2}{9}$，
$P(X=3) = (1-p)^2p = \left(\frac{2}{3}\right)^2 \times \frac{1}{3} = \frac{4}{27}$，
$P(X=4) = (1-p)^3p + (1-p)^4 = (1-p)^3 = \left(\frac{2}{3}\right)^3 = \frac{8}{27}$。
所以 $X$ 的分布列为
$$
\begin{array}{|c|c|c|c|c|}
\hline
X & 1 & 2 & 3 & 4 \\
\hline
P & \frac{1}{3} & \frac{2}{9} & \frac{4}{27} & \frac{8}{27} \\
\hline
\end{array}
$$

$(2)$ (i) $X > k$ 等价于前 $k$ 次投篮均未投中，则 $P(X > k) = (1-p)^k$。

$(ii)$ 因为 $m \in \mathbf{N}$，所以 $\{X > k+m\} \subseteq \{X > k\}$，
则 $P(\{X > k+m\} \cap \{X > k\}) = P(X > k+m)$。
$P(X > k+m \mid X > k) = \frac{P(\{X > k+m\} \cap \{X > k\})}{P(X > k)} = \frac{P(X > k+m)}{P(X > k)}$。
因为 $k+m \le N-1$, $k \le N-1$, $m \le N-1$，
由 (1) 可知 $P(X > k) = (1-p)^k$, $P(X > m) = (1-p)^m$, $P(X > k+m) = (1-p)^{k+m}$，
所以 $P(X > k+m \mid X > k) = \frac{P(X > k+m)}{P(X > k)} = \frac{(1-p)^{k+m}}{(1-p)^k} = (1-p)^m = P(X > m)$。`,
    scoringRubric: "共15分。需给出概率分布、一般式推导和条件概率证明。",
    tags: ["第一卷", "解答题", "概率"],
    difficulty: "中等",
  },
  {
    id: "paper1-q18",
    title: "第18题 椭圆与面积角度最值",
    type: "essay",
    score: 17,
    prompt: String.raw`已知椭圆 $C:\frac{x^2}{a^2}+\frac{y^2}{b^2}=1 \; (a>b>0)$ 的左焦点为 $F(-1,0)$，离心率为 $\frac{1}{2}$。

$(1)$ 求 $C$ 的方程；

$(2)$ 设 $O$ 为坐标原点，过 $F$ 且斜率大于 $0$ 的动直线 $l$ 与 $C$ 交于 $P,Q$ 两点，其中 $Q$ 在第三象限，直线 $PO$ 与 $C$ 的另一个交点为 $R$。

$(i)$ 若 $\triangle PQR$ 的面积是 $\triangle PFO$ 的面积的 $3$ 倍，求 $l$ 的方程；

$(ii)$ 求 $\tan \angle PQR$ 的最小值。`,
    referenceAnswer: String.raw`$(1)$ 由题意得， $c = 1$, $e = \frac{c}{a} = \frac{1}{2}$，所以 $a = 2$。
又 $b^2 = a^2 - c^2 = 3$，所以 $C: \frac{x^2}{4} + \frac{y^2}{3} = 1$。

$(2)$ 设 $l: y = k(x+1) \ (k>0)$, $P(x_1, y_1)$, $Q(x_2, y_2)$。
联立 $\begin{cases} y = k(x+1) \\ \frac{x^2}{4} + \frac{y^2}{3} = 1 \end{cases}$，消 $y$ 得 $(3+4k^2)x^2 + 8k^2x + 4k^2 - 12 = 0$。
由韦达定理得 $x_1 + x_2 = \frac{-8k^2}{3+4k^2}$, $x_1x_2 = \frac{4k^2 - 12}{3+4k^2}$。由对称性知 $R(-x_1, -y_1)$。

$(i)$ 由题意易知 $S_{\triangle PQR} = 2S_{\triangle PQO}$, $S_{\triangle PQO} = S_{PFO} + S_{\triangle QFO} = \frac{1}{2}|y_1| + \frac{1}{2}|y_2|$。
因为 $k>0$，点 $Q$ 在第三象限，所以 $x_2 < -1$, $y_2 < 0$。
又 $x_1 > x_2$, $y_1 > 0$，所以 $S_{\triangle PQO} = \frac{1}{2}(y_1 - y_2)$, $S_{\triangle PQR} = y_1 - y_2$。
因为 $S_{\triangle PQR} = 3S_{\triangle PFO}$，所以 $y_1 - y_2 = \frac{3}{2}y_1$, $y_1 = -2y_2$。
$k(x_1+1) = -2k(x_2+1)$，则 $x_1 = -2x_2 - 3$。
由 $x_1 + x_2 = \frac{-8k^2}{3+4k^2}$，则 $-x_2 - 3 = \frac{-8k^2}{3+4k^2}$, $x_2 = \frac{-9-4k^2}{3+4k^2}$, $x_1 = \frac{9-4k^2}{3+4k^2}$。
由 $x_1x_2 = \frac{4k^2 - 12}{3+4k^2}$，则 $\frac{16k^4 - 81}{(3+4k^2)^2} = \frac{4k^2 - 12}{3+4k^2}$, $16k^4 - 81 = 16k^4 - 36k^2 - 36$, $36k^2 = 45$，
解得 $k = \frac{\sqrt{5}}{2}$。故 $l: \sqrt{5}x - 2y + \sqrt{5} = 0$。

$(ii)$ 设直线 $l$ 的斜率为 $k$，易知 $k_{PQ} = k$，
$k_{QR} = \frac{y_2 - (-y_1)}{x_2 - (-x_1)} = \frac{y_1 + y_2}{x_1 + x_2} = \frac{k(x_1+1) + k(x_2+1)}{x_1 + x_2} = k\left(1 + \frac{2}{x_1+x_2}\right) = k\left[1 + \frac{2(3+4k^2)}{-8k^2}\right] = -\frac{3}{4k}$。
故 $\tan \angle PQR = \left| \frac{k_{PQ} - k_{QR}}{1 + k_{PQ}k_{QR}} \right| = \left| \frac{k + \frac{3}{4k}}{1 - \frac{3}{4}} \right| = 4\left(k + \frac{3}{4k}\right)$。
因为 $k>0$，所以 $\tan \angle PQR = 4\left(k + \frac{3}{4k}\right) \ge 4 \cdot 2 \sqrt{k \cdot \frac{3}{4k}} = 4\sqrt{3}$（当且仅当 $k = \frac{\sqrt{3}}{2}$ 时取等）。
故 $\tan \angle PQR$ 的最小值为 $4\sqrt{3}$。`,
    scoringRubric: "共17分。需完整写出椭圆参数求解、直线交点关系、面积方程和最值过程。",
    tags: ["第一卷", "解答题", "解析几何"],
    difficulty: "较难",
  },
  {
    id: "paper1-q19",
    title: "第19题 函数与集合 D(x0)",
    type: "essay",
    score: 17,
    prompt: String.raw`已知函数 $f(x)$ 的定义域为 $\mathbb{R}$，且当 $x < 0$ 时，$f(x) = 2^x$。对任意 $x_0 \in \mathbb{R}$，定义集合 $D(x_0) = \{d \in \mathbb{R} \mid f(x_0 + d) > f(x_0)\}$。

$(1)$ 若当 $x \ge 0$ 时，$f(x) = 1 - x$，求 $D(-1)$；

$(2)$ 若 $f(x)$ 是奇函数，$f(x_1) \le f(x_2)$，且 $x_1x_2 \ne 0$，证明：$D(x_1) \supseteq D(x_2)$；

$(3)$ 设 $f(x)$ 满足：若 $f(x_1) \le f(x_2)$，则 $D(x_1) \supseteq D(x_2)$；当 $0 < x < 1$ 时，$f(x) < f(0)$。

$(i)$ 证明：$f(0) \ge 1$；

$(ii)$ 证明：$f(x)$ 在区间 $(0, +\infty)$ 单调递增。`,
    referenceAnswer: String.raw`$(1)$ $f(-1) = 2^{-1} = \frac{1}{2}$，因为 $D(-1) = \{d \in \mathbf{R} \mid f(-1+d) > \frac{1}{2}\}$，令 $t = -1+d$，解 $f(t) > \frac{1}{2}$。
若 $t < 0$ 时， $f(t) = 2^t$, $2^t > \frac{1}{2} = 2^{-1}$。易知 $y = 2^x$ 单调递增，故 $t > -1$，则 $-1 < t < 0$；
若 $t \ge 0$ 时， $f(t) = 1 - t$，则 $1 - t > \frac{1}{2}$，解得 $t < \frac{1}{2}$，则 $0 \le t < \frac{1}{2}$。
综上所述， $t$ 的取值范围是 $(-1, \frac{1}{2})$。
代入 $t = -1+d$ 可得 $-1 < -1+d < \frac{1}{2}$，则 $0 < d < \frac{3}{2}$，故 $D(-1) = \{d \in \mathbf{R} \mid 0 < d < \frac{3}{2}\}$。

$(2)$ 因为 $f(x)$ 是奇函数，所以 $x > 0$ 时， $-x < 0$, $f(x) = -f(-x) = -2^{-x}$, $f(0) = 0$。
则 $f(x) = \begin{cases} 2^x, & x < 0 \\ 0, & x = 0 \\ -2^{-x}, & x > 0 \end{cases}$。
当 $x < 0$ 时， $f(x) \in (0, 1)$, $d \in D(x)$，等价于 $f(x+d) > f(x) > 0$，则 $x+d < 0$，且 $2^{x+d} > 2^x$, $d < -x$ 且 $d > 0$，所以 $D(x) = (0, -x)$。
当 $x > 0$ 时， $f(x) \in (-1, 0)$, $d \in D(x)$，等价于 $f(x+d) > -2^{-x}$。
若 $x+d < 0$, $f(x+d) > 0 > -2^{-x}$，得 $d < -x$； 若 $x+d = 0$, $f(0) = 0 > -2^{-x}$，得 $d = -x$；
若 $x+d > 0$, $f(x+d) = -2^{-(x+d)} > -2^{-x}$，则 $-(x+d) < -x$，得 $d > 0$。
所以 $D(x) = (-\infty, -x] \cup (0, +\infty)$。
已知 $f(x_1) \le f(x_2)$ 且 $x_1 x_2 \neq 0$：
①若 $x_1 < 0$, $x_2 < 0$, $2^{x_1} \le 2^{x_2}$, $x_1 \le x_2 < 0$, $-x_1 \ge -x_2 > 0$, $D(x_1) = (0, -x_1)$，
$D(x_2) = (0, -x_2)$。因为 $(0, -x_2) \subseteq (0, -x_1)$，所以 $D(x_1) \supseteq D(x_2)$。
②若 $x_1 > 0$, $x_2 > 0$, $-2^{-x_1} \le -2^{-x_2}$, $-x_1 \ge -x_2$, $0 < x_1 \le x_2$, $D(x_1) = (-\infty, -x_1] \cup (0, +\infty)$，
$D(x_2) = (-\infty, -x_2] \cup (0, +\infty)$。因为 $(-\infty, -x_2] \subseteq (-\infty, -x_1]$，所以 $D(x_1) \supseteq D(x_2)$。
③若 $x_1 > 0$, $x_2 < 0$, $f(x_1) < 0 < f(x_2)$，满足 $f(x_1) \le f(x_2)$。 $D(x_1) = (-\infty, -x_1] \cup (0, +\infty)$，
$D(x_2) = (0, -x_2)$。因为 $-x_2 > 0$, $(0, -x_2) \subseteq (0, +\infty) \subseteq D(x_1)$，所以 $D(x_1) \supseteq D(x_2)$。
④若 $x_1 < 0$, $x_2 > 0$, $f(x_1) > 0 > f(x_2)$，与 $f(x_1) \le f(x_2)$ 矛盾。
综上所述， $D(x_1) \supseteq D(x_2)$ 得证。

$(3)$ (i) 假设 $f(0) < 1$。若 $f(0) \le 0$，取 $x_1 = -\frac{1}{2}$, $f(x_1) = 2^{-\frac{1}{2}} > 0$, $f(0) < f(x_1)$，
则 $D(0) \supseteq D(x_1)$。
取 $d = \frac{1}{4}$, $x_1 + d = -\frac{1}{4} < 0$, $f(x_1+d) = 2^{-\frac{1}{4}} > 2^{-\frac{1}{2}} = f(x_1)$，故 $d \in D(x_1)$。
因为 $D(0) \supseteq D(x_1)$，所以 $d \in D(0)$, $f(d) > f(0)$。又 $d = \frac{1}{4} \in (0, 1)$，由题设知 $f(d) < f(0)$，矛盾。
若 $0 < f(0) < 1$，令 $x_0 = \log_2 f(0)$，则 $x_0 < 0$, $f(x_0) = 2^{x_0} = f(0)$。 $f(x_0) \le f(0)$，则 $D(x_0) \supseteq D(0)$。
$f(0) \le f(x_0)$，则 $D(0) \supseteq D(x_0)$。所以 $D(x_0) = D(0)$。
取 $d_0 = \min\left\{-\frac{x_0}{2}, \frac{1}{2}\right\}$。
因为 $x_0 < 0$，所以 $0 < d_0 \le \frac{1}{2} < 1$。由题设知 $f(d_0) < f(0)$，则 $d_0 \notin D(0)$。
又 $x_0 + d_0 \le x_0 - \frac{x_0}{2} = \frac{x_0}{2} < 0$。 $f(x_0 + d_0) = 2^{x_0 + d_0} > 2^{x_0} = f(x_0)$，所以 $d_0 \in D(x_0)$，与 $D(x_0) = D(0)$ 矛盾。
综上所述，假设不成立，所以 $f(0) \ge 1$。

$(ii)$ 若 $x \in (0, 1)$，假设 $f(x) > 0$。取 $c < 0$ 使得 $f(c) = 2^c < f(x)$。
由题设知 $f(x) < f(0)$, $f[x + (-x)] = f(0) > f(x)$，所以 $-x \in D(x)$。
由 $f(c) < f(x)$，则 $D(c) \supseteq D(x)$, $-x \in D(x)$，从而 $-x \in D(c)$，即 $f(c-x) > f(c)$。
因为 $c < 0$, $x > 0$，所以 $c - x < c < 0$。当 $x < 0$ 时， $f(x) = 2^x$ 单调递增，所以 $f(c-x) < f(c)$，矛盾。
所以 $\forall x \in (0, 1)$, $f(x) \le 0$。
若 $x \ge 1$，假设 $f(x) > 0$。取 $b < 0$ 使得 $f(b) = 2^b < f(x)$。
$f[b + (x-b)] = f(x) > f(b)$，则 $x-b \in D(b)$。
令 $b' = \frac{1}{2} - (x-b)$。因为 $x \ge 1$, $b < 0$，所以 $x-b > 1$，则 $b' < -\frac{1}{2} < b < 0$。
所以 $f(b') = 2^{b'} < 2^b = f(b)$。
由题设知 $D(b') \supseteq D(b)$，则 $x-b \in D(b')$。 $f[b' + (x-b)] = f\left(\frac{1}{2}\right) > f(b') > 0$，与 $\frac{1}{2} \in (0, 1)$ 且 $f\left(\frac{1}{2}\right) \le 0$ 矛盾。
所以 $\forall x > 0$, $f(x) \le 0$。
取 $0 < x < y$，因为 $y-x > 0$，则 $-(y-x)-1 < -1 < 0$, $f[-(y-x)-1] = 2^{-(y-x)-1} > 0$。
又 $x > 0$，则 $f(x) \le 0$，所以 $f(x) < f[-(y-x)-1]$。由题设知 $D(x) \supseteq D[-(y-x)-1]$。
因为 $-(y-x)-1 < -1 < 0$，所以 $f[-(y-x)-1] < f(-1)$。
$f[-(y-x)-1 + (y-x)] = f(-1) > f[-(y-x)-1]$，所以 $y-x \in D[-(y-x)-1]$，进而 $y-x \in D(x)$。
$f[x + (y-x)] > f(x)$, $f(y) > f(x)$。所以 $f(x)$ 在区间 $(0, +\infty)$ 上单调递增。`,
    scoringRubric: "共17分。需写出集合求解、包含关系证明和单调性证明的完整步骤。",
    tags: ["第一卷", "解答题", "函数"],
    difficulty: "较难",
  },
];
