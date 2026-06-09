import type { QuestionItem } from "@/lib/types";

export const paperTwoQuestions: QuestionItem[] = [
  {
    id: "paper2-q1",
    title: "第1题 复数平方",
    type: "single",
    score: 5,
    prompt: String.raw`$(1-3\mathrm{i})^2 =$`,
    options: [
      String.raw`$-8+6\mathrm{i}$`,
      String.raw`$-8-6\mathrm{i}$`,
      String.raw`$8+6\mathrm{i}$`,
      String.raw`$8-6\mathrm{i}$`,
    ],
    referenceAnswer: "B",
    scoringRubric: "单选题，计算复数平方并判断正确选项。",
    tags: ["第二卷", "选择题", "复数"],
    difficulty: "基础",
  },
  {
    id: "paper2-q2",
    title: "第2题 集合交集",
    type: "single",
    score: 5,
    prompt: String.raw`已知集合 $A=\{0,1,3,6,9\}$，$B=\{x \mid \sqrt{x}=x\}$，则 $A \cap B =$`,
    options: [
      String.raw`$\{0,1\}$`,
      String.raw`$\{3,6\}$`,
      String.raw`$\{0,1,9\}$`,
      String.raw`$\{0,3,9\}$`,
    ],
    referenceAnswer: "A",
    scoringRubric: "单选题，先求集合 B，再求交集。",
    tags: ["第二卷", "选择题", "集合"],
    difficulty: "基础",
  },
  {
    id: "paper2-q3",
    title: "第3题 向量数量积",
    type: "single",
    score: 5,
    prompt: String.raw`已知 $|\boldsymbol{a}+\boldsymbol{b}|=1$，$|\boldsymbol{a}-\boldsymbol{b}|=\sqrt{3}$，则 $\boldsymbol{a} \cdot \boldsymbol{b} =$`,
    options: [
      String.raw`$\frac{1}{2}$`,
      String.raw`$\frac{1}{3}$`,
      String.raw`$-\frac{1}{3}$`,
      String.raw`$-\frac{1}{2}$`,
    ],
    referenceAnswer: "D",
    scoringRubric: "单选题，利用平方展开求向量数量积。",
    tags: ["第二卷", "选择题", "向量"],
    difficulty: "基础",
  },
  {
    id: "paper2-q4",
    title: "第4题 双曲线渐近线",
    type: "single",
    score: 5,
    prompt: String.raw`已知双曲线 $C: \frac{x^2}{a^2} - \frac{y^2}{b^2} = 1 \; (a>0,\ b>0)$ 过点 $(1,0)$ 和 $\left(\frac{\sqrt{7}}{2}, 3\right)$，则双曲线 $C$ 的渐近线方程是`,
    options: [
      String.raw`$y = \pm 3\sqrt{2}x$`,
      String.raw`$y = \pm 2\sqrt{3}x$`,
      String.raw`$y = \pm \frac{\sqrt{3}}{6}x$`,
      String.raw`$y = \pm \frac{\sqrt{2}}{6}x$`,
    ],
    referenceAnswer: "B",
    scoringRubric: "单选题，根据过点条件求参数后写出渐近线方程。",
    tags: ["第二卷", "选择题", "圆锥曲线"],
    difficulty: "中等",
  },
  {
    id: "paper2-q5",
    title: "第5题 棱台体积",
    type: "single",
    score: 5,
    prompt: String.raw`已知棱台的上下底面均为有一个角为 $60^\circ$ 的菱形，且上下底面的边长分别为 $2$ 和 $3$，若该棱台的高为 $\sqrt{3}$，则该棱台的体积为`,
    options: [
      String.raw`$\frac{19}{12}$`,
      String.raw`$\frac{19}{6}$`,
      String.raw`$\frac{19}{4}$`,
      String.raw`$\frac{19}{2}$`,
    ],
    referenceAnswer: "D",
    scoringRubric: "单选题，先求上下底面积，再套用棱台体积公式。",
    tags: ["第二卷", "选择题", "立体几何"],
    difficulty: "中等",
  },
  {
    id: "paper2-q6",
    title: "第6题 分组计数",
    type: "single",
    score: 5,
    prompt: String.raw`现有甲、乙、丙、丁等 $8$ 人分成 $A, B$ 两个技术小组，要求每组 $4$ 人，且甲、乙必须在一起，丙、丁不能在一起，则不同的分配方案有`,
    options: [
      String.raw`$10$ 种`,
      String.raw`$12$ 种`,
      String.raw`$16$ 种`,
      String.raw`$24$ 种`,
    ],
    referenceAnswer: "C",
    scoringRubric: "单选题，结合捆绑与禁配条件分类计数。",
    tags: ["第二卷", "选择题", "排列组合"],
    difficulty: "中等",
  },
  {
    id: "paper2-q7",
    title: "第7题 三角恒等变换",
    type: "single",
    score: 5,
    prompt: String.raw`已知 $\alpha$ 为第二象限角，且 $3\sin 2\alpha \cos\alpha = 8\sin\alpha \cos 2\alpha$，则 $\frac{1+\cos\alpha}{2-\cos\alpha} =$`,
    options: [
      String.raw`$\frac{3}{4}$`,
      String.raw`$\frac{3}{5}$`,
      String.raw`$\frac{1}{2}$`,
      String.raw`$\frac{5}{12}$`,
    ],
    referenceAnswer: "C",
    scoringRubric: "单选题，化简方程求出三角函数值后代入。",
    tags: ["第二卷", "选择题", "三角函数"],
    difficulty: "中等",
  },
  {
    id: "paper2-q8",
    title: "第8题 偶函数与递推关系",
    type: "single",
    score: 5,
    prompt: String.raw`已知函数 $f(x)$ 为偶函数，且满足 $f(x)+f(x-2)=0$，且当 $x \in \left[\frac{3}{2}, 3\right]$ 时，$f(x) = x^2 + ax + b$，则`,
    options: [
      String.raw`$a=-2,\ b=-3$`,
      String.raw`$a=-2,\ b=3$`,
      String.raw`$a=-4,\ b=-3$`,
      String.raw`$a=-4,\ b=3$`,
    ],
    referenceAnswer: "D",
    scoringRubric: "单选题，利用偶函数与函数关系求参数。",
    tags: ["第二卷", "选择题", "函数"],
    difficulty: "较难",
  },
  {
    id: "paper2-q9",
    title: "第9题 圆的性质判断",
    type: "multiple",
    score: 6,
    prompt: String.raw`已知圆 $O: x^2 + y^2 = 1$，圆 $A: x^2 + y^2 - 6x - 8y + k = 0$，则下列说法正确的是`,
    options: [
      String.raw`点 $A$ 的坐标为 $(-3, -4)$`,
      String.raw`当 $k=9$ 时，圆 $A$ 与 $x$ 轴相切`,
      String.raw`当 $k=-11$ 时，圆 $A$ 与圆 $O$ 相切`,
      String.raw`当圆 $A$ 与圆 $O$ 相交时，两交点所在的直线方程为 $6x + 8y - k - 2 = 0$`,
    ],
    referenceAnswer: "BC",
    scoringRubric: "多选题，判断圆心、半径、相切条件以及两圆公共弦方程。",
    tags: ["第二卷", "多选题", "解析几何"],
    difficulty: "中等",
  },
  {
    id: "paper2-q10",
    title: "第10题 等比数列与前n项和",
    type: "multiple",
    score: 6,
    prompt: String.raw`已知等比数列 $\{a_n\}$ 的公比 $q \neq 1$，且 $a_1 > 0$，$2a_3 = a_1 + a_2$，记数列 $\{a_n\}$ 的前 $n$ 项和为 $S_n$，则`,
    options: [
      String.raw`$q = -\frac{1}{2}$`,
      String.raw`$S_n > \frac{2}{3}a_1$`,
      String.raw`$2S_{n+2} = S_{n+1} + S_n$`,
      String.raw`$S_1 + S_2 + \cdots + S_n > \frac{2n}{3}a_1$`,
    ],
    referenceAnswer: "ACD",
    scoringRubric: "多选题，先求公比，再判断和式性质。",
    tags: ["第二卷", "多选题", "数列"],
    difficulty: "中等",
  },
  {
    id: "paper2-q11",
    title: "第11题 抛物线与等边三角形",
    type: "multiple",
    score: 6,
    prompt: String.raw`已知抛物线 $E: y^2 = 8x$，有一斜率为 $k\ (k>0)$ 的直线 $l$ 过点 $(-1, 0)$，点 $A$ 在抛物线 $E$ 上，$B$, $C$ 两点在直线 $l$ 上，且 $\triangle ABC$ 为等边三角形，则`,
    options: [
      String.raw`抛物线 $E$ 的准线方程为 $x = -2$`,
      String.raw`当直线 $l$ 与抛物线 $E$ 无交点时，$k > \sqrt{2}$`,
      String.raw`若直线 $l$ 与抛物线 $E$ 相交于唯一一点 $B$，则抛物线 $E$ 的焦点在直线 $AB$ 上`,
      String.raw`当 $k=2$ 时，$\triangle ABC$ 面积的最小值为 $\frac{\sqrt{3}}{15}$`,
    ],
    referenceAnswer: "ABD",
    scoringRubric: "多选题，综合考查抛物线性质、直线位置关系与等边三角形条件。",
    tags: ["第二卷", "多选题", "圆锥曲线"],
    difficulty: "较难",
  },
  {
    id: "paper2-q12",
    title: "第12题 等差数列求和",
    type: "short",
    score: 5,
    prompt: String.raw`设 $S_n$ 为等差数列 $\{a_n\}$ 的前 $n$ 项和，若 $a_1 = -1$，$a_4 = 5$，则 $S_6 =$ \underline{\qquad\qquad}。`,
    referenceAnswer: "24",
    scoringRubric: "填空题，先由已知项求公差，再求前 6 项和。",
    tags: ["第二卷", "填空题", "数列"],
    difficulty: "基础",
  },
  {
    id: "paper2-q13",
    title: "第13题 指数函数零点参数范围",
    type: "short",
    score: 5,
    prompt: String.raw`若函数 $f(x) = 2^x + 2^{2-x} - m$ 有两个零点，则 $m$ 的取值范围是 \underline{\qquad\qquad}。`,
    referenceAnswer: String.raw`$(4, +\infty)$`,
    scoringRubric: "填空题，换元后分析函数最值与参数范围。",
    tags: ["第二卷", "填空题", "函数"],
    difficulty: "中等",
  },
  {
    id: "paper2-q14",
    title: "第14题 球面点与三角形面积",
    type: "short",
    score: 5,
    prompt: String.raw`已知球 $O$ 的体积为 $V_0 = 4\sqrt{3}\pi$，点 $A, B, C, D$ 均在球表面上，若 $\triangle ABC$ 为正三角形，且 $DA = DB = DC = \sqrt{2}$，则 $S_{\triangle ABC} =$ \underline{\qquad\qquad}。`,
    referenceAnswer: String.raw`$\dfrac{5\sqrt{3}}{4}$`,
    scoringRubric: "填空题，先由体积求半径，再结合空间几何关系求正三角形面积。",
    tags: ["第二卷", "填空题", "立体几何"],
    difficulty: "较难",
  },
  {
    id: "paper2-q15",
    title: "第15题 频率分布直方图与二项分布",
    type: "essay",
    score: 13,
    prompt: String.raw`某工厂抽取一批电子元件检测，记录第一次出故障的时间（天），然后绘制出关于“首次故障时间”和“对应频率”的频率分布直方图（纵轴为频率/组距，横轴为首次故障时间，区间为 $[345, 425]$，组距为 $10$）。

$(1)$ 求第一四分位数和中位数；

$(2)$ 设 $\hat{p}$ 为首次故障时间小于 $365$ 天的概率估计值。

\quad $(i)$ 求 $\hat{p}$；

\quad $(ii)$ 已知该工厂向某用户出售了 $100$ 件电子元件，$X$ 为这 $100$ 件产品首次出现故障时间小于 $365$ 天的件数，若 $X \sim B(100, \hat{p})$，求 $E(X)$ 和 $D(X)$。`,
    referenceAnswer: String.raw`$(1)$ 由频率分布直方图，各组频率分别为：
$[345, 355)$：$0.005 \times 10 = 0.05$；
$[355, 365)$：$0.010 \times 10 = 0.10$；
$[365, 375)$：$0.020 \times 10 = 0.20$；
$[375, 385)$：$0.025 \times 10 = 0.25$。

前两组频率之和为 $0.05 + 0.10 = 0.15 < 0.25$；
前三组频率之和为 $0.15 + 0.20 = 0.35 > 0.25$；故第一四分位数在区间 $[365, 375)$ 内。

设第一四分位数为 $Q_1$，则 $0.15 + (Q_1 - 365) \times 0.020 = 0.25$，解得 $Q_1 = 370$。

前四组频率之和为 $0.35 + 0.25 = 0.60 > 0.50$；故中位数在区间 $[375, 385)$ 内。

设中位数为 $M$，则 $0.35 + (M - 375) \times 0.025 = 0.50$，解得 $M = 381$。

故第一四分位数为 370，中位数为 381。

$(2)$（i）首次故障时间小于 365 天对应的区间为 $[345, 355)$ 和 $[355, 365)$，则
$$\hat{p} = 0.05 + 0.10 = 0.15.$$

（ii）由题意得 $X \sim B(100, 0.15)$。
$$E(X) = n\hat{p} = 100 \times 0.15 = 15;$$
$$D(X) = n\hat{p}(1-\hat{p}) = 100 \times 0.15 \times 0.85 = 12.75.$$`,
    scoringRubric: "共13分。需根据频率分布直方图读取数据并完成四分位数、概率估计、二项分布期望和方差计算。",
    tags: ["第二卷", "解答题", "统计概率"],
    difficulty: "中等",
  },
  {
    id: "paper2-q16",
    title: "第16题 三棱锥中的垂直与线面角",
    type: "essay",
    score: 15,
    prompt: String.raw`如图，在三棱锥 $A$-$BCD$ 中，点 $E$ 在 $BD$ 上，$AE \perp CE$，$AE \perp DE$，$CD \perp AD$。

$(1)$ 求证：$CD \perp AB$；

$(2)$ 若 $DE=2$，$BE=1$，$AE=\sqrt{2}$，$CD=2\sqrt{3}$，求直线 $AD$ 与面 $ABC$ 所成角的正弦值。`,
    referenceAnswer: String.raw`$(1)$ 因为 $AE \perp CE$，$AE \perp DE$，$CE \cap DE = E$，$CE, DE \subset$ 平面 $BCD$，
所以 $AE \perp$ 平面 $BCD$。因为 $CD \subset$ 平面 $BCD$，所以 $AE \perp CD$。

又 $CD \perp AD$，$AE \cap AD = A$，$AE, AD \subset$ 平面 $ABD$，所以 $CD \perp$ 平面 $ABD$。

因为 $AB \subset$ 平面 $ABD$，所以 $CD \perp AB$。

$(2)$ 由（1）知 $AE \perp$ 平面 $BCD$，$CD \perp$ 平面 $ABD$。
因为 $BD \subset$ 平面 $ABD$，所以 $CD \perp BD$。

在 $\mathrm{Rt}\triangle ADE$ 中，$AE = \sqrt{2}$，$DE = 2$，所以 $AD = \sqrt{6}$。
在 $\mathrm{Rt}\triangle ABE$ 中，$AE = \sqrt{2}$，$BE = 1$，所以 $AB = \sqrt{3}$。
在 $\mathrm{Rt}\triangle CDB$ 中，$CD = 2\sqrt{3}$，$BD = 3$，所以 $BC = \sqrt{21}$。
在 $\mathrm{Rt}\triangle CDE$ 中，$CD = 2\sqrt{3}$，$DE = 2$，所以 $CE = 4$。
在 $\mathrm{Rt}\triangle AEC$ 中，$AE = \sqrt{2}$，$CE = 4$，所以 $AC = 3\sqrt{2}$。
在 $\triangle ABC$ 中，$AB^2 + AC^2 = 3 + 18 = 21 = BC^2$，所以 $\angle BAC = 90^\circ$。

$$S_{\triangle ABC} = \frac{1}{2} AB \cdot AC = \frac{1}{2} \times \sqrt{3} \times 3\sqrt{2} = \frac{3\sqrt{6}}{2}, \quad S_{\triangle ABD} = \frac{1}{2} BD \cdot AE = \frac{3\sqrt{2}}{2}.$$

设点 $D$ 到平面 $ABC$ 的距离为 $h$。因为 $V_{D\text{-}ABC} = V_{C\text{-}ABD}$，所以
$$\frac{1}{3} \cdot \frac{3\sqrt{6}}{2} \cdot h = \frac{1}{3} \cdot \frac{3\sqrt{2}}{2} \cdot 2\sqrt{3},$$
解得 $h = 2$。

设直线 $AD$ 与平面 $ABC$ 所成角为 $\theta$，则
$$\sin\theta = \frac{h}{AD} = \frac{2}{\sqrt{6}} = \frac{\sqrt{6}}{3}.$$

故直线 $AD$ 与平面 $ABC$ 所成角的正弦值为 $\dfrac{\sqrt{6}}{3}$。`,
    scoringRubric: "共15分。需完成空间垂直关系证明，并求直线与平面所成角的正弦值。",
    tags: ["第二卷", "解答题", "立体几何"],
    difficulty: "中等",
  },
  {
    id: "paper2-q17",
    title: "第17题 三角形性质与周长",
    type: "essay",
    score: 15,
    prompt: String.raw`在 $\triangle ABC$ 中，已知 $\cos B = \frac{3}{4}$，$\cos^2(A+C) + \sin A \sin C = 1$。

$(1)$ 证明：$\triangle ABC$ 为钝角三角形；

$(2)$ 若 $\triangle ABC$ 的面积为 $\frac{\sqrt{7}}{4}$，求 $\triangle ABC$ 的周长。`,
    referenceAnswer: String.raw`$(1)$ 在 $\triangle ABC$ 中，$A+B+C=\pi$，故 $\cos(A+C) = \cos(\pi - B) = -\cos B = -\dfrac{3}{4}$。

由 $\cos^2(A+C) + \sin A \sin C = 1$ 得 $\dfrac{9}{16} + \sin A \sin C = 1$，故 $\sin A \sin C = \dfrac{7}{16}$。

又 $\cos(A+C) = \cos A \cos C - \sin A \sin C$，所以
$$-\frac{3}{4} = \cos A \cos C - \frac{7}{16}, \quad \cos A \cos C = -\frac{5}{16}.$$

因为 $\cos A \cos C < 0$，所以 $\cos A$ 与 $\cos C$ 异号，必有一个为负值，即 $A$ 或 $C$ 为钝角，故 $\triangle ABC$ 为钝角三角形。

$(2)$ 因为 $\cos B = \dfrac{3}{4}$，$B \in (0,\pi)$，所以 $\sin B = \dfrac{\sqrt{7}}{4}$。

由 $S_{\triangle ABC} = \dfrac{1}{2}ac\sin B = \dfrac{\sqrt{7}}{4}$，解得 $ac = 2$。

由正弦定理，设外接圆半径为 $R$：
$$ac = 4R^2 \sin A \sin C = 4R^2 \cdot \frac{7}{16} = \frac{7}{4}R^2 = 2, \quad 4R^2 = \frac{32}{7}.$$

$$b^2 = 4R^2 \sin^2 B = \frac{32}{7} \cdot \frac{7}{16} = 2, \quad b = \sqrt{2}.$$

由余弦定理：$b^2 = a^2 + c^2 - 2ac\cos B$，得
$$2 = a^2 + c^2 - 3, \quad a^2 + c^2 = 5, \quad (a+c)^2 = a^2+c^2+2ac = 9, \quad a+c = 3.$$

故 $\triangle ABC$ 的周长为 $a + b + c = 3 + \sqrt{2}$。`,
    scoringRubric: "共15分。需利用三角恒等关系判定角型，并结合面积条件求周长。",
    tags: ["第二卷", "解答题", "三角函数"],
    difficulty: "中等",
  },
  {
    id: "paper2-q18",
    title: "第18题 椭圆与轨迹曲线",
    type: "essay",
    score: 17,
    prompt: String.raw`椭圆 $E: \frac{x^2}{a^2} + y^2 = 1 \; (a>1)$，过右焦点且与 $x$ 轴垂直的直线被 $E$ 截得的长度为 $\sqrt{2}$。

$(1)$ 求 $E$ 的离心率；

$(2)$ $O$ 为坐标原点，给定点 $G(t_0, 0)\ (t_0 \neq 0)$，$A(x_0, y_0)\ (y_0 \neq 0)$ 在 $E$ 上，过点 $A$ 作 $y$ 轴的垂线，垂足为 $B$，$AO$ 与 $GB$ 交于点 $P$，当 $A$ 在 $E$ 上运动时，$P$ 的轨迹为 $M$。

\quad $(i)$ 求 $M$ 的方程，并说明 $M$ 是什么曲线；

\quad $(ii)$ $M$ 是否有中心点？当 $t_0$ 为何值时，$M$ 有中心点？当 $M$ 有中心点时，平移 $M$ 到 $M'$，使 $O$ 为 $M'$ 的中心点，说明 $M'$ 的形状。`,
    referenceAnswer: String.raw`$(1)$ 椭圆 $E$ 的半短轴长 $b=1$，右焦点 $F(c, 0)$，$c = \sqrt{a^2-1}$。

过 $F$ 且与 $x$ 轴垂直的弦长为 $\dfrac{2b^2}{a} = \dfrac{2}{a} = \sqrt{2}$，解得 $a = \sqrt{2}$，$c = 1$。

故 $E$ 的离心率 $e = \dfrac{c}{a} = \dfrac{\sqrt{2}}{2}$。

$(2)$ 由（1）知 $E: \dfrac{x^2}{2} + y^2 = 1$。

设 $A(x_0, y_0)$，则 $B(0, y_0)$，且 $\dfrac{x_0^2}{2} + y_0^2 = 1$（$y_0 \neq 0$）。

直线 $AO$：$y_0 x - x_0 y = 0$；
直线 $GB$：$y_0 x + t_0 y = t_0 y_0$。

设 $P(x, y)$，由两方程解得 $y_0 = \dfrac{t_0 y}{t_0 - x}$，$x_0 = \dfrac{t_0 x}{t_0 - x}$（$x \neq t_0$）。

代入椭圆方程，整理得 $P$ 的轨迹方程 $M$：
$$(t_0^2 - 2)x^2 + 4t_0 x + 2t_0^2 y^2 = 2t_0^2 \quad (y \neq 0).$$

$(i)$
\begin{itemize}
\item 当 $t_0^2 > 2$ 时，曲线 $M$ 为椭圆（不含与 $x$ 轴的两个交点）；
\item 当 $0 < t_0^2 < 2$ 时，曲线 $M$ 为双曲线（不含与 $x$ 轴的两个交点）；
\item 当 $t_0^2 = 2$ 时，曲线 $M$ 为抛物线（不含顶点）。
\end{itemize}

$(ii)$ 当 $t_0^2 \neq 2$ 时，曲线 $M$ 有中心点；当 $t_0^2 = 2$ 时，无中心点。

当 $M$ 有中心点时，平移后的曲线 $M'$：
$$(t_0^2 - 2)X^2 + 2t_0^2 Y^2 = \frac{2t_0^4}{t_0^2 - 2} \quad (Y \neq 0).$$

\begin{itemize}
\item 当 $t_0^2 > 2$ 时，$M'$ 为焦点在 $x$ 轴上的椭圆（不含与 $x$ 轴的两个交点）；
\item 当 $0 < t_0^2 < 2$ 时，$M'$ 为焦点在 $x$ 轴上的双曲线（不含与 $x$ 轴的两个交点）。
\end{itemize}`,
    scoringRubric: "共17分。需求椭圆离心率、轨迹方程，并分析轨迹的中心与平移后的形状。",
    tags: ["第二卷", "解答题", "解析几何"],
    difficulty: "较难",
  },
  {
    id: "paper2-q19",
    title: "第19题 指数函数与参数不等式",
    type: "essay",
    score: 17,
    prompt: String.raw`已知函数 $f(x) = xe^x + ax + b$，曲线 $y = f(x)$ 在点 $(0, f(0))$ 处的切线为 $y = -2x + 1$。

$(1)$ 求 $a$，$b$；

$(2)$ 当 $x > 0$ 时，$f(x+m) - f(x) > m$，求 $m$ 的取值范围；

$(3)$ 当 $x > 0$ 时，$f(x+k) + f(k-x) > 2f(k)$，求 $k$ 的最小值。`,
    referenceAnswer: String.raw`$(1)$ 因为 $f(x) = xe^x + ax + b$，所以 $f'(x) = (x+1)e^x + a$。

切线为 $y = -2x + 1$，切点坐标为 $(0, b)$，故 $b = 1$。

由 $f'(0) = -2$：$(0+1)e^0 + a = -2$，解得 $a = -3$。

故 $a = -3$，$b = 1$。

$(2)$ 由（1）知 $f(x) = xe^x - 3x + 1$。

当 $x > 0$ 时，$f(x+m) - f(x) > m$ 恒成立，即 $f(x+m)-(x+m) > f(x)-x$ 恒成立。

令 $g(x) = f(x) - x = xe^x - 4x + 1$，题意等价于对任意 $x > 0$，$g(x+m) - g(x) > 0$。

令 $H(x) = g(x+m) - g(x)$。

① 若 $m \leq 0$：当 $m = 0$，$H(x) = 0$ 不满足；当 $m < 0$ 时，可取适当 $x_0 > 0$ 使 $H(x_0) < 0$，矛盾。

② 若 $m > 0$：$g'(x) = (x+1)e^x - 4$，$g''(x) = (x+2)e^x > 0$（$x \geq 0$），故 $g'$ 单调递增。对任意 $x > 0$，$g'(x+m) > g'(x)$，则 $H'(x) > 0$，$H(x)$ 单调递增。

要使 $H(x) > 0$ 恒成立，只需 $H(0) \geq 0$：
$$H(0) = g(m) - g(0) = m(e^m - 4) \geq 0, \quad m \geq 0,$$
解得 $m \geq \ln 4$。

综上，$m$ 的取值范围是 $[\ln 4, +\infty)$。

$(3)$ 当 $x > 0$ 时，$f(x+k) + f(k-x) > 2f(k)$ 恒成立，整理得
$$(x+k)e^{x+k} + (k-x)e^{k-x} > 2ke^k.$$

令 $m(x) = (x+k)e^x + (k-x)e^{-x} - 2k$（$x \geq 0$），$m(0) = 0$，

$$m'(x) = (x+k+1)e^x + (x-k-1)e^{-x},$$
$$n(x) = m'(x), \quad n(0) = 0,$$
$$n'(x) = x(e^x - e^{-x}) + (k+2)(e^x + e^{-x}).$$

① 当 $k \geq -2$ 时：$x > 0$ 时 $e^x - e^{-x} > 0$，$k+2 \geq 0$，故 $n'(x) > 0$，$n(x)$ 单调递增，$n(x) > 0$，$m'(x) > 0$，$m(x)$ 单调递增，$m(x) > 0$，满足题意。

② 当 $k < -2$ 时：令 $k = -2-c$（$c > 0$），可证在某 $(0, x_0)$ 上 $n'(x) < 0$，$m(x) < 0$，矛盾。

综上，$k \geq -2$，故 $k$ 的最小值为 $-2$。`,
    scoringRubric: "共17分。需由切线条件确定参数，并完成两类不等式参数范围分析。",
    tags: ["第二卷", "解答题", "导数与不等式"],
    difficulty: "较难",
  },
];
