begin;

insert into public.exam_questions (
  id,
  paper_id,
  section_no,
  section_title,
  question_no,
  title,
  question_type,
  prompt_latex,
  score,
  options_json,
  tags_json,
  difficulty
)
values
(
  'paper1-q1',
  'paper-1',
  1,
  '一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。',
  1,
  '第1题 样本数据中位数',
  'single',
  '样本数据 $6, 8, 4, 5, 12$ 的中位数为',
  5,
  '["$5$","$6$","$8$","$9$"]'::jsonb,
  '["第一卷","选择题","统计"]'::jsonb,
  '基础'
),
(
  'paper1-q2',
  'paper-1',
  1,
  '一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。',
  2,
  '第2题 平面向量系数判断',
  'single',
  '已知平面向量 $a$，$b$ 不共线，且 $2a + yb = xa - 3b$，则',
  5,
  '["$x = 2$，$y = -3$","$x = -2$，$y = 3$","$x = 2$，$y = 3$","$x = -2$，$y = -3$"]'::jsonb,
  '["第一卷","选择题","向量"]'::jsonb,
  '基础'
),
(
  'paper1-q3',
  'paper-1',
  1,
  '一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。',
  3,
  '第3题 集合交集',
  'single',
  '已知集合 $A = \left\{\sin\frac{7\pi}{6}, \cos\frac{5\pi}{3}, \tan\frac{5\pi}{4}\right\}$，$B = \left\{-\frac{\sqrt{3}}{2}, -\frac{1}{2}, 1\right\}$，则 $A \cap B =$',
  5,
  '["$\\left\\{-\\frac{\\sqrt{3}}{2}, \\frac{1}{2}\\right\\}$","$\\left\\{-\\frac{\\sqrt{3}}{2}, 1\\right\\}$","$\\left\\{-\\frac{1}{2}, 1\\right\\}$","$\\left\\{-\\frac{\\sqrt{3}}{2}, -\\frac{1}{2}, 1\\right\\}$"]'::jsonb,
  '["第一卷","选择题","集合"]'::jsonb,
  '基础'
),
(
  'paper1-q4',
  'paper-1',
  1,
  '一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。',
  4,
  '第4题 切线方程',
  'single',
  '曲线 $y = 5x + 8\ln x$ 在点 $(1, 5)$ 处的切线方程为',
  5,
  '["$y = 3x + 2$","$y = 5x$","$y = 8x - 3$","$y = 13x - 8$"]'::jsonb,
  '["第一卷","选择题","导数"]'::jsonb,
  '基础'
),
(
  'paper1-q5',
  'paper-1',
  1,
  '一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。',
  5,
  '第5题 抛物线焦点距离',
  'single',
  '已知抛物线 $C_1: y^2 = 2p_1x \, (p_1 > 0)$ 和 $C_2: x^2 = 2p_2y \, (p_2 > 0)$ 均经过点 $(4, 8)$，则 $C_1$ 的焦点与 $C_2$ 的焦点之间的距离为',
  5,
  '["$12$","$4\\sqrt{5}$","$6$","$\\frac{\\sqrt{65}}{2}$"]'::jsonb,
  '["第一卷","选择题","圆锥曲线"]'::jsonb,
  '中等'
),
(
  'paper1-q6',
  'paper-1',
  1,
  '一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。',
  6,
  '第6题 函数最值参数',
  'single',
  '已知函数 $f(x) = \frac{x+2}{e^x+a}$ 的最大值为 $1$，则 $a =$',
  5,
  '["$\\frac{1}{2}$","$1$","$\\frac{3}{2}$","$2$"]'::jsonb,
  '["第一卷","选择题","导数","最值"]'::jsonb,
  '中等'
),
(
  'paper1-q7',
  'paper-1',
  1,
  '一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。',
  7,
  '第7题 一百零八塔分组',
  'single',
  '一百零八塔共有 $108$ 座塔，依山势自上而下排列成 $12$ 行。记第 $i$ 行塔座数为 $a_i$，其中 $a_1 = 1$，$a_2 = a_3 = 3$，$a_4 = a_5 = 5$，且 $a_6, a_7, a_8, \dots, a_{12}$ 是一个首项为 $7$、公差为 $2$ 的等差数列。将 $a_1, a_2, \dots, a_{12}$ 分为 $6$ 组，每组 $2$ 个数，使得每组的 $2$ 个数之和可构成一个项数为 $6$ 且公差为 $d(d > 0)$ 的等差数列，则 $d =$',
  5,
  '["$2$","$4$","$6$","$8$"]'::jsonb,
  '["第一卷","选择题","数列"]'::jsonb,
  '中等'
),
(
  'paper1-q8',
  'paper-1',
  1,
  '一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。',
  8,
  '第8题 离散点集数学期望',
  'single',
  '设 $U = \{(x_1, x_2, x_3) \mid x_i \in \{-2, -1, 1, 2\}, i=1, 2, 3\}$ 为空间中 $64$ 个点构成的集合，点 $P(1, 1, 1)$。记样本空间 $\Omega = U \setminus \{P\}$，从 $\Omega$ 中随机取一个点，定义随机变量 $X$ 如下：对 $\Omega$ 中的每个点 $A(x_1, x_2, x_3)$，令 $X(A) = x_1 + x_2 + x_3$，则 $X$ 的数学期望为',
  5,
  '["$-\\frac{1}{21}$","$-\\frac{1}{63}$","$0$","$\\frac{1}{7}$"]'::jsonb,
  '["第一卷","选择题","概率统计"]'::jsonb,
  '中等'
),
(
  'paper1-q9',
  'paper-1',
  2,
  '二、选择题：本题共3小题，每小题6分，共18分。在每小题给出的选项中，有多项符合题目要求。全部选对的得6分，部分选对的得部分分，有选错的得0分。',
  9,
  '第9题 复数性质',
  'multiple',
  '设 $z = 3 + 2\mathrm{i}$，则',
  6,
  '["$\\bar{z} = 3 - 2\\mathrm{i}$","$|z| = 5$","$z^2 = 5 + 12\\mathrm{i}$","$\\frac{z+3}{z-\\mathrm{i}} \\in \\mathbb{R}$"]'::jsonb,
  '["第一卷","多选题","复数"]'::jsonb,
  '基础'
),
(
  'paper1-q10',
  'paper-1',
  2,
  '二、选择题：本题共3小题，每小题6分，共18分。在每小题给出的选项中，有多项符合题目要求。全部选对的得6分，部分选对的得部分分，有选错的得0分。',
  10,
  '第10题 空间几何关系判断',
  'multiple',
  '在空间中，$A$、$B$ 为两个定点，动点 $C$ 到直线 $AB$ 的距离为 $2$，动点 $D$ 到直线 $AB$ 的距离为 $1$。若二面角 $C-AB-D$ 为 $60^\circ$，则',
  6,
  '["$\\angle CAD \\ge 60^\\circ$","$CD \\ge \\sqrt{3}$","当 $AB \\perp CD$ 时，$CD \\perp$ 平面 $ABD$","当 $AB \\perp$ 平面 $ACD$ 时，$AC \\perp AD$"]'::jsonb,
  '["第一卷","多选题","立体几何"]'::jsonb,
  '中等'
),
(
  'paper1-q11',
  'paper-1',
  2,
  '二、选择题：本题共3小题，每小题6分，共18分。在每小题给出的选项中，有多项符合题目要求。全部选对的得6分，部分选对的得部分分，有选错的得0分。',
  11,
  '第11题 三圆与截弦',
  'multiple',
  '已知圆 $C_1: (x+1)^2+y^2=1$，圆 $C_2: (x-1)^2+y^2=1$，圆 $C_3: x^2+(y-\sqrt{3})^2=1$。直线 $l: y=kx+b$ 与 $C_1$、$C_2$、$C_3$ 均有两个交点，记 $l$ 被 $C_1$、$C_2$、$C_3$ 截得的弦长分别为 $s_1, s_2, s_3$。则',
  6,
  '["$k$ 可以取任意实数","满足 $s_1=s_2=s_3$ 的直线 $l$ 共有 $3$ 条","满足 $s_1+s_2+s_3=3$ 的直线 $l$ 多于 $3$ 条","当 $b=0$ 时，$s_1+s_2+s_3$ 的最大值为 $\\frac{2\\sqrt{21}}{3}$"]'::jsonb,
  '["第一卷","多选题","解析几何"]'::jsonb,
  '较难'
),
(
  'paper1-q12',
  'paper-1',
  3,
  '三、填空题：本题共3小题，每小题5分，共15分。',
  12,
  '第12题 双曲线离心率',
  'short',
  '双曲线 $5x^2 - 6y^2 = 1$ 的离心率为 $\underline{\qquad\qquad}$。',
  5,
  null,
  '["第一卷","填空题","圆锥曲线"]'::jsonb,
  '基础'
),
(
  'paper1-q13',
  'paper-1',
  3,
  '三、填空题：本题共3小题，每小题5分，共15分。',
  13,
  '第13题 三角函数性质',
  'short',
  '已知 $f(x) = 2\sin(ax+\theta)$，其中 $a \in \mathbb{Z}$，$0 \le \theta < 2\pi$，是偶函数，且 $f(x)$ 在区间 $\left(0, \frac{\pi}{2}\right)$ 单调递增，则 $\theta = \underline{\qquad\qquad}$，$f\left(\frac{2\pi}{3}\right) = \underline{\qquad\qquad}$。',
  5,
  null,
  '["第一卷","填空题","三角函数"]'::jsonb,
  '中等'
),
(
  'paper1-q14',
  'paper-1',
  3,
  '三、填空题：本题共3小题，每小题5分，共15分。',
  14,
  '第14题 数列与等比项',
  'short',
  '设实数 $q$ 满足：存在数列 $\{a_n\}$，使得对于任意 $n \in \mathbb{N}^*$，均有 $a_1 + a_2 + \cdots + a_{3n} = n^2 + n$，且 $\{a_n\}$ 中有某些项 $a_{i_1}, a_{i_2}, \cdots, a_{i_9}$ 是公比为 $q$ 的等比数列，则 $q$ 的最大值为 $\underline{\qquad\qquad}$。',
  5,
  null,
  '["第一卷","填空题","数列"]'::jsonb,
  '较难'
),
(
  'paper1-q15',
  'paper-1',
  4,
  '四、解答题：本题共5小题，共77分。解答应写出文字说明、证明过程或演算步骤。',
  15,
  '第15题 直三棱柱中的平行与距离',
  'essay',
  '在直三棱柱 $ABC-A_1B_1C_1$ 中，$\angle ACB = 90^\circ$，$AC = BC$，$D$、$E$ 分别为 $AB$、$AC_1$ 的中点。

$(1)$ 证明：$DE \parallel$ 平面 $BCC_1B_1$；

$(2)$ 设 $CC_1 = 2$，直线 $DE$ 与平面 $ACC_1A_1$ 所成的角为 $45^\circ$，求直线 $DE$ 到平面 $BCC_1B_1$ 的距离。',
  13,
  null,
  '["第一卷","解答题","立体几何"]'::jsonb,
  '中等'
),
(
  'paper1-q16',
  'paper-1',
  4,
  '四、解答题：本题共5小题，共77分。解答应写出文字说明、证明过程或演算步骤。',
  16,
  '第16题 三角形求角与长度',
  'essay',
  '已知在 $\triangle ABC$ 中，$AB = 3$，$BC = 2\sqrt{3}$，$\cos B = \frac{\sqrt{3}}{3}$。

$(1)$ 求 $\cos A$；

$(2)$ 设 $D$、$E$ 两点满足：$D$ 在 $BA$ 的延长线上，$DE \parallel BC$，$AE \perp AC$。若 $DE = \sqrt{6}$，求 $CE$。',
  15,
  null,
  '["第一卷","解答题","解三角形"]'::jsonb,
  '中等'
),
(
  'paper1-q17',
  'paper-1',
  4,
  '四、解答题：本题共5小题，共77分。解答应写出文字说明、证明过程或演算步骤。',
  17,
  '第17题 投篮停止次数的概率模型',
  'essay',
  '设整数 $N \ge 2$。某同学用一个球进行投篮练习，至多投篮 $N$ 次。当且仅当投中 $1$ 次或 $N$ 次均未投中时，停止练习。设该同学每次投中的概率为 $p(0 < p < 1)$，各次投中与否相互独立。记 $X$ 为停止练习时该同学的投篮次数。

$(1)$ 当 $N = 4,\; p = \frac{1}{3}$ 时，求 $X$ 的分布列；

$(2)$ 设 $k,m$ 均为自然数。

$(i)$ 当 $k \le N - 1$ 时，求 $P(X > k)$；

$(ii)$ 当 $k + m \le N - 1$ 时，证明：$P(X > k + m \mid X > k) = P(X > m)$。',
  15,
  null,
  '["第一卷","解答题","概率"]'::jsonb,
  '中等'
),
(
  'paper1-q18',
  'paper-1',
  4,
  '四、解答题：本题共5小题，共77分。解答应写出文字说明、证明过程或演算步骤。',
  18,
  '第18题 椭圆与面积角度最值',
  'essay',
  '已知椭圆 $C:\frac{x^2}{a^2}+\frac{y^2}{b^2}=1 \; (a>b>0)$ 的左焦点为 $F(-1,0)$，离心率为 $\frac{1}{2}$。

$(1)$ 求 $C$ 的方程；

$(2)$ 设 $O$ 为坐标原点，过 $F$ 且斜率大于 $0$ 的动直线 $l$ 与 $C$ 交于 $P,Q$ 两点，其中 $Q$ 在第三象限，直线 $PO$ 与 $C$ 的另一个交点为 $R$。

$(i)$ 若 $\triangle PQR$ 的面积是 $\triangle PFO$ 的面积的 $3$ 倍，求 $l$ 的方程；

$(ii)$ 求 $\tan \angle PQR$ 的最小值。',
  17,
  null,
  '["第一卷","解答题","解析几何"]'::jsonb,
  '较难'
),
(
  'paper1-q19',
  'paper-1',
  4,
  '四、解答题：本题共5小题，共77分。解答应写出文字说明、证明过程或演算步骤。',
  19,
  '第19题 函数与集合 D(x0)',
  'essay',
  '已知函数 $f(x)$ 的定义域为 $\mathbb{R}$，且当 $x < 0$ 时，$f(x) = 2^x$。对任意 $x_0 \in \mathbb{R}$，定义集合 $D(x_0) = \{d \in \mathbb{R} \mid f(x_0 + d) > f(x_0)\}$。

$(1)$ 若当 $x \ge 0$ 时，$f(x) = 1 - x$，求 $D(-1)$；

$(2)$ 若 $f(x)$ 是奇函数，$f(x_1) \le f(x_2)$，且 $x_1x_2 \ne 0$，证明：$D(x_1) \supseteq D(x_2)$；

$(3)$ 设 $f(x)$ 满足：若 $f(x_1) \le f(x_2)$，则 $D(x_1) \supseteq D(x_2)$；当 $0 < x < 1$ 时，$f(x) < f(0)$。

$(i)$ 证明：$f(0) \ge 1$；

$(ii)$ 证明：$f(x)$ 在区间 $(0, +\infty)$ 单调递增。',
  17,
  null,
  '["第一卷","解答题","函数"]'::jsonb,
  '较难'
),
(
  'paper2-q1',
  'paper-2',
  1,
  '一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。',
  1,
  '第1题 复数平方',
  'single',
  '$(1-3\mathrm{i})^2 =$',
  5,
  '["$-8+6\\mathrm{i}$","$-8-6\\mathrm{i}$","$8+6\\mathrm{i}$","$8-6\\mathrm{i}$"]'::jsonb,
  '["第二卷","选择题","复数"]'::jsonb,
  '基础'
),
(
  'paper2-q2',
  'paper-2',
  1,
  '一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。',
  2,
  '第2题 集合交集',
  'single',
  '已知集合 $A=\{0,1,3,6,9\}$，$B=\{x \mid \sqrt{x}=x\}$，则 $A \cap B =$',
  5,
  '["$\\{0,1\\}$","$\\{3,6\\}$","$\\{0,1,9\\}$","$\\{0,3,9\\}$"]'::jsonb,
  '["第二卷","选择题","集合"]'::jsonb,
  '基础'
),
(
  'paper2-q3',
  'paper-2',
  1,
  '一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。',
  3,
  '第3题 向量数量积',
  'single',
  '已知 $|\boldsymbol{a}+\boldsymbol{b}|=1$，$|\boldsymbol{a}-\boldsymbol{b}|=\sqrt{3}$，则 $\boldsymbol{a} \cdot \boldsymbol{b} =$',
  5,
  '["$\\frac{1}{2}$","$\\frac{1}{3}$","$-\\frac{1}{3}$","$-\\frac{1}{2}$"]'::jsonb,
  '["第二卷","选择题","向量"]'::jsonb,
  '基础'
),
(
  'paper2-q4',
  'paper-2',
  1,
  '一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。',
  4,
  '第4题 双曲线渐近线',
  'single',
  '已知双曲线 $C: \frac{x^2}{a^2} - \frac{y^2}{b^2} = 1 \; (a>0,\ b>0)$ 过点 $(1,0)$ 和 $\left(\frac{\sqrt{7}}{2}, 3\right)$，则双曲线 $C$ 的渐近线方程是',
  5,
  '["$y = \\pm 3\\sqrt{2}x$","$y = \\pm 2\\sqrt{3}x$","$y = \\pm \\frac{\\sqrt{3}}{6}x$","$y = \\pm \\frac{\\sqrt{2}}{6}x$"]'::jsonb,
  '["第二卷","选择题","圆锥曲线"]'::jsonb,
  '中等'
),
(
  'paper2-q5',
  'paper-2',
  1,
  '一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。',
  5,
  '第5题 棱台体积',
  'single',
  '已知棱台的上下底面均为有一个角为 $60^\circ$ 的菱形，且上下底面的边长分别为 $2$ 和 $3$，若该棱台的高为 $\sqrt{3}$，则该棱台的体积为',
  5,
  '["$\\frac{19}{12}$","$\\frac{19}{6}$","$\\frac{19}{4}$","$\\frac{19}{2}$"]'::jsonb,
  '["第二卷","选择题","立体几何"]'::jsonb,
  '中等'
),
(
  'paper2-q6',
  'paper-2',
  1,
  '一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。',
  6,
  '第6题 分组计数',
  'single',
  '现有甲、乙、丙、丁等 $8$ 人分成 $A, B$ 两个技术小组，要求每组 $4$ 人，且甲、乙必须在一起，丙、丁不能在一起，则不同的分配方案有',
  5,
  '["$10$ 种","$12$ 种","$16$ 种","$24$ 种"]'::jsonb,
  '["第二卷","选择题","排列组合"]'::jsonb,
  '中等'
),
(
  'paper2-q7',
  'paper-2',
  1,
  '一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。',
  7,
  '第7题 三角恒等变换',
  'single',
  '已知 $\alpha$ 为第二象限角，且 $3\sin 2\alpha \cos\alpha = 8\sin\alpha \cos 2\alpha$，则 $\frac{1+\cos\alpha}{2-\cos\alpha} =$',
  5,
  '["$\\frac{3}{4}$","$\\frac{3}{5}$","$\\frac{1}{2}$","$\\frac{5}{12}$"]'::jsonb,
  '["第二卷","选择题","三角函数"]'::jsonb,
  '中等'
),
(
  'paper2-q8',
  'paper-2',
  1,
  '一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。',
  8,
  '第8题 偶函数与递推关系',
  'single',
  '已知函数 $f(x)$ 为偶函数，且满足 $f(x)+f(x-2)=0$，且当 $x \in \left[\frac{3}{2}, 3\right]$ 时，$f(x) = x^2 + ax + b$，则',
  5,
  '["$a=-2,\\ b=-3$","$a=-2,\\ b=3$","$a=-4,\\ b=-3$","$a=-4,\\ b=3$"]'::jsonb,
  '["第二卷","选择题","函数"]'::jsonb,
  '较难'
),
(
  'paper2-q9',
  'paper-2',
  2,
  '二、选择题：本题共3小题，每小题6分，共18分。在每小题给出的选项中，有多项符合题目要求。全部选对的得6分，部分选对的得部分分，有选错的得0分。',
  9,
  '第9题 圆的性质判断',
  'multiple',
  '已知圆 $O: x^2 + y^2 = 1$，圆 $A: x^2 + y^2 - 6x - 8y + k = 0$，则下列说法正确的是',
  6,
  '["点 $A$ 的坐标为 $(-3, -4)$","当 $k=9$ 时，圆 $A$ 与 $x$ 轴相切","当 $k=-11$ 时，圆 $A$ 与圆 $O$ 相切","当圆 $A$ 与圆 $O$ 相交时，两交点所在的直线方程为 $6x + 8y - k - 2 = 0$"]'::jsonb,
  '["第二卷","多选题","解析几何"]'::jsonb,
  '中等'
),
(
  'paper2-q10',
  'paper-2',
  2,
  '二、选择题：本题共3小题，每小题6分，共18分。在每小题给出的选项中，有多项符合题目要求。全部选对的得6分，部分选对的得部分分，有选错的得0分。',
  10,
  '第10题 等比数列与前n项和',
  'multiple',
  '已知等比数列 $\{a_n\}$ 的公比 $q \neq 1$，且 $a_1 > 0$，$2a_3 = a_1 + a_2$，记数列 $\{a_n\}$ 的前 $n$ 项和为 $S_n$，则',
  6,
  '["$q = -\\frac{1}{2}$","$S_n > \\frac{2}{3}a_1$","$2S_{n+2} = S_{n+1} + S_n$","$S_1 + S_2 + \\cdots + S_n > \\frac{2n}{3}a_1$"]'::jsonb,
  '["第二卷","多选题","数列"]'::jsonb,
  '中等'
),
(
  'paper2-q11',
  'paper-2',
  2,
  '二、选择题：本题共3小题，每小题6分，共18分。在每小题给出的选项中，有多项符合题目要求。全部选对的得6分，部分选对的得部分分，有选错的得0分。',
  11,
  '第11题 抛物线与等边三角形',
  'multiple',
  '已知抛物线 $E: y^2 = 8x$，有一斜率为 $k\ (k>0)$ 的直线 $l$ 过点 $(-1, 0)$，点 $A$ 在抛物线 $E$ 上，$B$, $C$ 两点在直线 $l$ 上，且 $\triangle ABC$ 为等边三角形，则',
  6,
  '["抛物线 $E$ 的准线方程为 $x = -2$","当直线 $l$ 与抛物线 $E$ 无交点时，$k > \\sqrt{2}$","若直线 $l$ 与抛物线 $E$ 相交于唯一一点 $B$，则抛物线 $E$ 的焦点在直线 $AB$ 上","当 $k=2$ 时，$\\triangle ABC$ 面积的最小值为 $\\frac{\\sqrt{3}}{15}$"]'::jsonb,
  '["第二卷","多选题","圆锥曲线"]'::jsonb,
  '较难'
),
(
  'paper2-q12',
  'paper-2',
  3,
  '三、填空题：本题共3小题，每小题5分，共15分。',
  12,
  '第12题 等差数列求和',
  'short',
  '设 $S_n$ 为等差数列 $\{a_n\}$ 的前 $n$ 项和，若 $a_1 = -1$，$a_4 = 5$，则 $S_6 =$ \underline{\qquad\qquad}。',
  5,
  null,
  '["第二卷","填空题","数列"]'::jsonb,
  '基础'
),
(
  'paper2-q13',
  'paper-2',
  3,
  '三、填空题：本题共3小题，每小题5分，共15分。',
  13,
  '第13题 指数函数零点参数范围',
  'short',
  '若函数 $f(x) = 2^x + 2^{2-x} - m$ 有两个零点，则 $m$ 的取值范围是 \underline{\qquad\qquad}。',
  5,
  null,
  '["第二卷","填空题","函数"]'::jsonb,
  '中等'
),
(
  'paper2-q14',
  'paper-2',
  3,
  '三、填空题：本题共3小题，每小题5分，共15分。',
  14,
  '第14题 球面点与三角形面积',
  'short',
  '已知球 $O$ 的体积为 $V_0 = 4\sqrt{3}\pi$，点 $A, B, C, D$ 均在球表面上，若 $\triangle ABC$ 为正三角形，且 $DA = DB = DC = \sqrt{2}$，则 $S_{\triangle ABC} =$ \underline{\qquad\qquad}。',
  5,
  null,
  '["第二卷","填空题","立体几何"]'::jsonb,
  '较难'
),
(
  'paper2-q15',
  'paper-2',
  4,
  '四、解答题：本题共5小题，共77分。解答应写出文字说明、证明过程或演算步骤。',
  15,
  '第15题 频率分布直方图与二项分布',
  'essay',
  '某工厂抽取一批电子元件检测，记录第一次出故障的时间（天），然后绘制出关于“首次故障时间”和“对应频率”的频率分布直方图（纵轴为频率/组距，横轴为首次故障时间，区间为 $[345, 425]$，组距为 $10$）。

$(1)$ 求第一四分位数和中位数；

$(2)$ 设 $\hat{p}$ 为首次故障时间小于 $365$ 天的概率估计值。

\quad $(i)$ 求 $\hat{p}$；

\quad $(ii)$ 已知该工厂向某用户出售了 $100$ 件电子元件，$X$ 为这 $100$ 件产品首次出现故障时间小于 $365$ 天的件数，若 $X \sim B(100, \hat{p})$，求 $E(X)$ 和 $D(X)$。',
  13,
  null,
  '["第二卷","解答题","统计概率"]'::jsonb,
  '中等'
),
(
  'paper2-q16',
  'paper-2',
  4,
  '四、解答题：本题共5小题，共77分。解答应写出文字说明、证明过程或演算步骤。',
  16,
  '第16题 三棱锥中的垂直与线面角',
  'essay',
  '如图，在三棱锥 $A$-$BCD$ 中，点 $E$ 在 $BD$ 上，$AE \perp CE$，$AE \perp DE$，$CD \perp AD$。

$(1)$ 求证：$CD \perp AB$；

$(2)$ 若 $DE=2$，$BE=1$，$AE=\sqrt{2}$，$CD=2\sqrt{3}$，求直线 $AD$ 与面 $ABC$ 所成角的正弦值。',
  15,
  null,
  '["第二卷","解答题","立体几何"]'::jsonb,
  '中等'
),
(
  'paper2-q17',
  'paper-2',
  4,
  '四、解答题：本题共5小题，共77分。解答应写出文字说明、证明过程或演算步骤。',
  17,
  '第17题 三角形性质与周长',
  'essay',
  '在 $\triangle ABC$ 中，已知 $\cos B = \frac{3}{4}$，$\cos^2(A+C) + \sin A \sin C = 1$。

$(1)$ 证明：$\triangle ABC$ 为钝角三角形；

$(2)$ 若 $\triangle ABC$ 的面积为 $\frac{\sqrt{7}}{4}$，求 $\triangle ABC$ 的周长。',
  15,
  null,
  '["第二卷","解答题","三角函数"]'::jsonb,
  '中等'
),
(
  'paper2-q18',
  'paper-2',
  4,
  '四、解答题：本题共5小题，共77分。解答应写出文字说明、证明过程或演算步骤。',
  18,
  '第18题 椭圆与轨迹曲线',
  'essay',
  '椭圆 $E: \frac{x^2}{a^2} + y^2 = 1 \; (a>1)$，过右焦点且与 $x$ 轴垂直的直线被 $E$ 截得的长度为 $\sqrt{2}$。

$(1)$ 求 $E$ 的离心率；

$(2)$ $O$ 为坐标原点，给定点 $G(t_0, 0)\ (t_0 \neq 0)$，$A(x_0, y_0)\ (y_0 \neq 0)$ 在 $E$ 上，过点 $A$ 作 $y$ 轴的垂线，垂足为 $B$，$AO$ 与 $GB$ 交于点 $P$，当 $A$ 在 $E$ 上运动时，$P$ 的轨迹为 $M$。

\quad $(i)$ 求 $M$ 的方程，并说明 $M$ 是什么曲线；

\quad $(ii)$ $M$ 是否有中心点？当 $t_0$ 为何值时，$M$ 有中心点？当 $M$ 有中心点时，平移 $M$ 到 $M''$，使 $O$ 为 $M''$ 的中心点，说明 $M''$ 的形状。',
  17,
  null,
  '["第二卷","解答题","解析几何"]'::jsonb,
  '较难'
),
(
  'paper2-q19',
  'paper-2',
  4,
  '四、解答题：本题共5小题，共77分。解答应写出文字说明、证明过程或演算步骤。',
  19,
  '第19题 指数函数与参数不等式',
  'essay',
  '已知函数 $f(x) = xe^x + ax + b$，曲线 $y = f(x)$ 在点 $(0, f(0))$ 处的切线为 $y = -2x + 1$。

$(1)$ 求 $a$，$b$；

$(2)$ 当 $x > 0$ 时，$f(x+m) - f(x) > m$，求 $m$ 的取值范围；

$(3)$ 当 $x > 0$ 时，$f(x+k) + f(k-x) > 2f(k)$，求 $k$ 的最小值。',
  17,
  null,
  '["第二卷","解答题","导数与不等式"]'::jsonb,
  '较难'
)
on conflict (id) do update
set
  paper_id = excluded.paper_id,
  section_no = excluded.section_no,
  section_title = excluded.section_title,
  question_no = excluded.question_no,
  title = excluded.title,
  question_type = excluded.question_type,
  prompt_latex = excluded.prompt_latex,
  score = excluded.score,
  options_json = excluded.options_json,
  tags_json = excluded.tags_json,
  difficulty = excluded.difficulty,
  updated_at = now();

insert into app_private.exam_answer_keys (
  question_id,
  reference_answer,
  scoring_rubric
)
values
(
  'paper1-q1',
  'B',
  '单选题，判断中位数计算是否正确。'
),
(
  'paper1-q2',
  'A',
  '单选题，依据向量基本定理比较对应系数。'
),
(
  'paper1-q3',
  'C',
  '单选题，先求三角函数值，再求集合交集。'
),
(
  'paper1-q4',
  'D',
  '单选题，求导并代入切点写出切线方程。'
),
(
  'paper1-q5',
  'D',
  '单选题，根据过点条件求参数，再求两焦点间距离。'
),
(
  'paper1-q6',
  'B',
  '单选题，利用最大值条件建立参数方程。'
),
(
  'paper1-q7',
  'B',
  '单选题，整理数列后分析分组和形成的等差数列。'
),
(
  'paper1-q8',
  'A',
  '单选题，利用对称性并考虑去掉点 P 后的修正。'
),
(
  'paper1-q9',
  'ACD',
  '多选题，判断每个选项是否成立，全部选对满分，部分选对得部分分。'
),
(
  'paper1-q10',
  'BC',
  '多选题，结合空间向量或截面法判断选项真伪。'
),
(
  'paper1-q11',
  'BCD',
  '多选题，利用圆心到直线距离与弦长公式分析。'
),
(
  'paper1-q12',
  '$\frac{\sqrt{66}}{6}$',
  '填空题，化为标准方程后求离心率。'
),
(
  'paper1-q13',
  '$\frac{3\pi}{2};\ 1$',
  '填空题，满分5分。第一空2分，第二空3分，结合偶函数与单调性确定参数后求函数值。'
),
(
  'paper1-q14',
  '$\sqrt[3]{\frac{3}{2}}$',
  '填空题，先由部分和求通项，再分析 9 项等比子列的最大公比。'
),
(
  'paper1-q15',
  '$(1)$ 取 $CC_1$ 中点 $F$， $BC$ 中点 $G$，连接 $EF$, $FG$, $DG$。
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
所以 $DG = \frac{1}{2} AC = 1$，故直线 $DE$ 到平面 $BCC_1B_1$ 的距离为 $1$。',
  '共13分。需要写出完整证明、几何关系分析和距离计算步骤。'
),
(
  'paper1-q16',
  '$(1)$ 在 $\triangle ABC$ 中， $AC^2 = AB^2 + BC^2 - 2AB \cdot BC \cos B = 9 + 12 - 2 \times 3 \times 2\sqrt{3} \times \frac{\sqrt{3}}{3} = 9$，
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
$CE = 3\sqrt{5}$。',
  '共15分。需写出余弦定理、相似或解析过程及长度计算。'
),
(
  'paper1-q17',
  '$(1)$ $X=1,\ 2,\ 3,\ 4$。
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
所以 $P(X > k+m \mid X > k) = \frac{P(X > k+m)}{P(X > k)} = \frac{(1-p)^{k+m}}{(1-p)^k} = (1-p)^m = P(X > m)$。',
  '共15分。需给出概率分布、一般式推导和条件概率证明。'
),
(
  'paper1-q18',
  '$(1)$ 由题意得， $c = 1$, $e = \frac{c}{a} = \frac{1}{2}$，所以 $a = 2$。
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
故 $\tan \angle PQR$ 的最小值为 $4\sqrt{3}$。',
  '共17分。需完整写出椭圆参数求解、直线交点关系、面积方程和最值过程。'
),
(
  'paper1-q19',
  '$(1)$ $f(-1) = 2^{-1} = \frac{1}{2}$，因为 $D(-1) = \{d \in \mathbf{R} \mid f(-1+d) > \frac{1}{2}\}$，令 $t = -1+d$，解 $f(t) > \frac{1}{2}$。
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
令 $b'' = \frac{1}{2} - (x-b)$。因为 $x \ge 1$, $b < 0$，所以 $x-b > 1$，则 $b'' < -\frac{1}{2} < b < 0$。
所以 $f(b'') = 2^{b''} < 2^b = f(b)$。
由题设知 $D(b'') \supseteq D(b)$，则 $x-b \in D(b'')$。 $f[b'' + (x-b)] = f\left(\frac{1}{2}\right) > f(b'') > 0$，与 $\frac{1}{2} \in (0, 1)$ 且 $f\left(\frac{1}{2}\right) \le 0$ 矛盾。
所以 $\forall x > 0$, $f(x) \le 0$。
取 $0 < x < y$，因为 $y-x > 0$，则 $-(y-x)-1 < -1 < 0$, $f[-(y-x)-1] = 2^{-(y-x)-1} > 0$。
又 $x > 0$，则 $f(x) \le 0$，所以 $f(x) < f[-(y-x)-1]$。由题设知 $D(x) \supseteq D[-(y-x)-1]$。
因为 $-(y-x)-1 < -1 < 0$，所以 $f[-(y-x)-1] < f(-1)$。
$f[-(y-x)-1 + (y-x)] = f(-1) > f[-(y-x)-1]$，所以 $y-x \in D[-(y-x)-1]$，进而 $y-x \in D(x)$。
$f[x + (y-x)] > f(x)$, $f(y) > f(x)$。所以 $f(x)$ 在区间 $(0, +\infty)$ 上单调递增。',
  '共17分。需写出集合求解、包含关系证明和单调性证明的完整步骤。'
),
(
  'paper2-q1',
  'B',
  '单选题，计算复数平方并判断正确选项。'
),
(
  'paper2-q2',
  'A',
  '单选题，先求集合 B，再求交集。'
),
(
  'paper2-q3',
  'D',
  '单选题，利用平方展开求向量数量积。'
),
(
  'paper2-q4',
  'B',
  '单选题，根据过点条件求参数后写出渐近线方程。'
),
(
  'paper2-q5',
  'D',
  '单选题，先求上下底面积，再套用棱台体积公式。'
),
(
  'paper2-q6',
  'C',
  '单选题，结合捆绑与禁配条件分类计数。'
),
(
  'paper2-q7',
  'C',
  '单选题，化简方程求出三角函数值后代入。'
),
(
  'paper2-q8',
  'D',
  '单选题，利用偶函数与函数关系求参数。'
),
(
  'paper2-q9',
  'BC',
  '多选题，判断圆心、半径、相切条件以及两圆公共弦方程。'
),
(
  'paper2-q10',
  'ACD',
  '多选题，先求公比，再判断和式性质。'
),
(
  'paper2-q11',
  'ABD',
  '多选题，综合考查抛物线性质、直线位置关系与等边三角形条件。'
),
(
  'paper2-q12',
  '24',
  '填空题，先由已知项求公差，再求前 6 项和。'
),
(
  'paper2-q13',
  '$(4, +\infty)$',
  '填空题，换元后分析函数最值与参数范围。'
),
(
  'paper2-q14',
  '$\dfrac{5\sqrt{3}}{4}$',
  '填空题，先由体积求半径，再结合空间几何关系求正三角形面积。'
),
(
  'paper2-q15',
  '$(1)$ 由频率分布直方图，各组频率分别为：
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
$$D(X) = n\hat{p}(1-\hat{p}) = 100 \times 0.15 \times 0.85 = 12.75.$$',
  '共13分。需根据频率分布直方图读取数据并完成四分位数、概率估计、二项分布期望和方差计算。'
),
(
  'paper2-q16',
  '$(1)$ 因为 $AE \perp CE$，$AE \perp DE$，$CE \cap DE = E$，$CE, DE \subset$ 平面 $BCD$，
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

故直线 $AD$ 与平面 $ABC$ 所成角的正弦值为 $\dfrac{\sqrt{6}}{3}$。',
  '共15分。需完成空间垂直关系证明，并求直线与平面所成角的正弦值。'
),
(
  'paper2-q17',
  '$(1)$ 在 $\triangle ABC$ 中，$A+B+C=\pi$，故 $\cos(A+C) = \cos(\pi - B) = -\cos B = -\dfrac{3}{4}$。

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

故 $\triangle ABC$ 的周长为 $a + b + c = 3 + \sqrt{2}$。',
  '共15分。需利用三角恒等关系判定角型，并结合面积条件求周长。'
),
(
  'paper2-q18',
  '$(1)$ 椭圆 $E$ 的半短轴长 $b=1$，右焦点 $F(c, 0)$，$c = \sqrt{a^2-1}$。

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

当 $M$ 有中心点时，平移后的曲线 $M''$：
$$(t_0^2 - 2)X^2 + 2t_0^2 Y^2 = \frac{2t_0^4}{t_0^2 - 2} \quad (Y \neq 0).$$

\begin{itemize}
\item 当 $t_0^2 > 2$ 时，$M''$ 为焦点在 $x$ 轴上的椭圆（不含与 $x$ 轴的两个交点）；
\item 当 $0 < t_0^2 < 2$ 时，$M''$ 为焦点在 $x$ 轴上的双曲线（不含与 $x$ 轴的两个交点）。
\end{itemize}',
  '共17分。需求椭圆离心率、轨迹方程，并分析轨迹的中心与平移后的形状。'
),
(
  'paper2-q19',
  '$(1)$ 因为 $f(x) = xe^x + ax + b$，所以 $f''(x) = (x+1)e^x + a$。

切线为 $y = -2x + 1$，切点坐标为 $(0, b)$，故 $b = 1$。

由 $f''(0) = -2$：$(0+1)e^0 + a = -2$，解得 $a = -3$。

故 $a = -3$，$b = 1$。

$(2)$ 由（1）知 $f(x) = xe^x - 3x + 1$。

当 $x > 0$ 时，$f(x+m) - f(x) > m$ 恒成立，即 $f(x+m)-(x+m) > f(x)-x$ 恒成立。

令 $g(x) = f(x) - x = xe^x - 4x + 1$，题意等价于对任意 $x > 0$，$g(x+m) - g(x) > 0$。

令 $H(x) = g(x+m) - g(x)$。

① 若 $m \leq 0$：当 $m = 0$，$H(x) = 0$ 不满足；当 $m < 0$ 时，可取适当 $x_0 > 0$ 使 $H(x_0) < 0$，矛盾。

② 若 $m > 0$：$g''(x) = (x+1)e^x - 4$，$g''''(x) = (x+2)e^x > 0$（$x \geq 0$），故 $g''$ 单调递增。对任意 $x > 0$，$g''(x+m) > g''(x)$，则 $H''(x) > 0$，$H(x)$ 单调递增。

要使 $H(x) > 0$ 恒成立，只需 $H(0) \geq 0$：
$$H(0) = g(m) - g(0) = m(e^m - 4) \geq 0, \quad m \geq 0,$$
解得 $m \geq \ln 4$。

综上，$m$ 的取值范围是 $[\ln 4, +\infty)$。

$(3)$ 当 $x > 0$ 时，$f(x+k) + f(k-x) > 2f(k)$ 恒成立，整理得
$$(x+k)e^{x+k} + (k-x)e^{k-x} > 2ke^k.$$

令 $m(x) = (x+k)e^x + (k-x)e^{-x} - 2k$（$x \geq 0$），$m(0) = 0$，

$$m''(x) = (x+k+1)e^x + (x-k-1)e^{-x},$$
$$n(x) = m''(x), \quad n(0) = 0,$$
$$n''(x) = x(e^x - e^{-x}) + (k+2)(e^x + e^{-x}).$$

① 当 $k \geq -2$ 时：$x > 0$ 时 $e^x - e^{-x} > 0$，$k+2 \geq 0$，故 $n''(x) > 0$，$n(x)$ 单调递增，$n(x) > 0$，$m''(x) > 0$，$m(x)$ 单调递增，$m(x) > 0$，满足题意。

② 当 $k < -2$ 时：令 $k = -2-c$（$c > 0$），可证在某 $(0, x_0)$ 上 $n''(x) < 0$，$m(x) < 0$，矛盾。

综上，$k \geq -2$，故 $k$ 的最小值为 $-2$。',
  '共17分。需由切线条件确定参数，并完成两类不等式参数范围分析。'
)
on conflict (question_id) do update
set
  reference_answer = excluded.reference_answer,
  scoring_rubric = excluded.scoring_rubric,
  updated_at = now();

commit;
