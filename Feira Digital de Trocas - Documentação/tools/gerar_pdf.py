from __future__ import annotations

from pathlib import Path
import textwrap

from PIL import Image, ImageDraw, ImageFont
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    Image as PdfImage,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
PDF_PATH = ROOT / "Documentacao_FeiraDigital_Jeova.pdf"


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    names = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for name in names:
        if Path(name).exists():
            return ImageFont.truetype(name, size)
    return ImageFont.load_default()


def rounded(draw: ImageDraw.ImageDraw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def text(draw, xy, value, size=24, fill="#1f2933", bold=False, max_width=None):
    selected = font(size, bold)
    if max_width is None:
        draw.text(xy, value, font=selected, fill=fill)
        return

    words = value.split()
    lines = []
    line = ""
    for word in words:
        test = f"{line} {word}".strip()
        if draw.textlength(test, font=selected) <= max_width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)

    y = xy[1]
    for line in lines:
        draw.text((xy[0], y), line, font=selected, fill=fill)
        y += int(size * 1.35)


def make_canvas(width=1440, height=960):
    image = Image.new("RGB", (width, height), "#f5f7f4")
    return image, ImageDraw.Draw(image)


def draw_header(draw):
    draw.rectangle((0, 0, 1440, 210), fill="#163a35")
    text(draw, (82, 36), "Atividade final de fixação", 20, "#a7f3d0", True)
    text(draw, (82, 72), "Feira Digital de Trocas", 52, "#f8faf8", True)
    text(
        draw,
        (82, 142),
        "Cadastre objetos para troca ou doação, pesquise itens da comunidade, reserve o que interessar e mantenha tudo salvo no navegador.",
        25,
        "#d9eee9",
        max_width=1040,
    )


def input_box(draw, x, y, w, label, value=""):
    text(draw, (x, y), label, 21, "#1f2a27", True)
    rounded(draw, (x, y + 34, x + w, y + 86), 8, "#ffffff", "#d8e2dd", 2)
    if value:
        text(draw, (x + 18, y + 50), value, 20, "#61706a")


def button(draw, x, y, w, label, fill="#0f766e", fg="#ffffff"):
    rounded(draw, (x, y, x + w, y + 54), 8, fill)
    tw = draw.textlength(label, font=font(20, True))
    text(draw, (x + (w - tw) / 2, y + 14), label, 20, fg, True)


def stat(draw, x, y, label, value, accent="#047857", bg="#f8fafc"):
    rounded(draw, (x, y, x + 260, y + 136), 8, bg, "#d8e2dd", 2)
    text(draw, (x + 24, y + 22), label.upper(), 18, "#61706a", True)
    text(draw, (x + 24, y + 68), value, 42, accent, True)


def screenshot_cadastro():
    img, draw = make_canvas()
    draw_header(draw)
    rounded(draw, (80, 250, 1360, 665), 8, "#ffffff", "#d8e2dd", 2)
    text(draw, (114, 284), "Cadastrar item", 30, "#115e59", True)
    text(draw, (114, 326), "Campos marcados com * são obrigatórios.", 20, "#61706a")
    input_box(draw, 114, 382, 560, "Nome do item *", "Livro de JavaScript")
    input_box(draw, 720, 382, 560, "Categoria *", "Livros")
    input_box(draw, 114, 492, 560, "Estado de conservação *", "Bom")
    input_box(draw, 720, 492, 560, "Tipo de disponibilidade *", "Troca")
    button(draw, 114, 590, 210, "Adicionar item")
    button(draw, 340, 590, 220, "Carregar exemplos", "#eff6ff", "#1d4ed8")
    button(draw, 576, 590, 210, "Limpar formulário", "#ffffff", "#1f2a27")

    rounded(draw, (80, 700, 1360, 900), 8, "#ffffff", "#d8e2dd", 2)
    text(draw, (114, 734), "Resumo", 30, "#115e59", True)
    stat(draw, 114, 794, "Total", "3")
    stat(draw, 406, 794, "Disponíveis", "2", "#047857", "#f0fdf4")
    stat(draw, 698, 794, "Reservados", "1", "#b45309", "#fff7ed")
    stat(draw, 990, 794, "Doações", "1", "#15803d", "#ecfdf5")
    img.save(ASSETS / "tela-cadastro-resumo.png", quality=95)


def tag(draw, x, y, label, bg, fg):
    selected = font(16, True)
    w = int(draw.textlength(label, font=selected)) + 30
    rounded(draw, (x, y, x + w, y + 34), 17, bg)
    text(draw, (x + 15, y + 8), label, 16, fg, True)
    return w


def card(draw, x, y, title, desc, categoria, estado, responsavel, situacao, tipo):
    bg = "#fffaf4" if situacao == "Reservado" else "#ffffff"
    rounded(draw, (x, y, x + 595, y + 260), 8, bg, "#d8e2dd", 2)
    draw.rectangle((x, y, x + 8, y + 260), fill="#b45309" if situacao == "Reservado" else "#047857")
    draw.rectangle((x, y, x + 595, y + 6), fill="#6d28d9" if tipo == "Troca" else "#15803d")
    text(draw, (x + 28, y + 26), title, 26, "#1f2a27", True)
    w1 = tag(draw, x + 360, y + 24, situacao.upper(), "#ffedd5" if situacao == "Reservado" else "#d1fae5", "#9a3412" if situacao == "Reservado" else "#065f46")
    tag(draw, x + 370 + w1, y + 24, tipo.upper(), "#ede9fe" if tipo == "Troca" else "#dcfce7", "#6d28d9" if tipo == "Troca" else "#15803d")
    text(draw, (x + 28, y + 72), desc, 19, "#61706a", max_width=520)
    text(draw, (x + 28, y + 142), f"Categoria: {categoria}", 18, "#1f2a27", True)
    text(draw, (x + 28, y + 170), f"Estado: {estado}", 18, "#1f2a27", True)
    text(draw, (x + 28, y + 198), f"Responsável: {responsavel}", 18, "#1f2a27", True)
    button(draw, x + 340, y + 190, 170, "Reservar" if situacao != "Reservado" else "Disponibilizar")
    button(draw, x + 522, y + 190, 58, "X", "#fee2e2", "#b91c1c")


def screenshot_filtros_lista():
    img, draw = make_canvas()
    draw_header(draw)
    rounded(draw, (80, 250, 1360, 410), 8, "#ffffff", "#d8e2dd", 2)
    text(draw, (114, 282), "Pesquisa e filtros", 30, "#115e59", True)
    input_box(draw, 114, 328, 430, "Pesquisar", "livro")
    input_box(draw, 570, 328, 220, "Categoria", "Todas")
    input_box(draw, 815, 328, 220, "Tipo", "Todos")
    input_box(draw, 1060, 328, 220, "Situação", "Todos")

    text(draw, (82, 462), "Itens cadastrados", 32, "#115e59", True)
    rounded(draw, (1160, 462, 1336, 500), 19, "#d9f2ee")
    text(draw, (1184, 471), "2 resultado(s)", 18, "#115e59", True)
    card(draw, 80, 530, "Livro de JavaScript", "Livro usado em ótimo estado, ideal para revisar DOM e funções.", "Livros", "Bom", "Ana", "Disponível", "Troca")
    card(draw, 765, 530, "Mochila escolar", "Mochila limpa, com marcas leves de uso e zíper funcionando.", "Roupas", "Usado", "Bruno", "Reservado", "Doação")
    img.save(ASSETS / "tela-filtros-lista.png", quality=95)


def screenshot_validacao():
    img, draw = make_canvas()
    draw_header(draw)
    rounded(draw, (80, 250, 1360, 870), 8, "#ffffff", "#d8e2dd", 2)
    rounded(draw, (114, 282, 1280, 336), 8, "#fee2e2", "#fecaca", 2)
    text(draw, (134, 296), "Revise os campos destacados antes de cadastrar.", 22, "#b91c1c", True)
    text(draw, (114, 372), "Cadastrar item", 30, "#115e59", True)
    input_box(draw, 114, 438, 560, "Nome do item *")
    rounded(draw, (114, 472, 674, 524), 8, "#fff5f5", "#b91c1c", 3)
    text(draw, (114, 532), "Digite um nome válido.", 17, "#b91c1c", True)
    input_box(draw, 720, 438, 560, "Categoria *")
    rounded(draw, (720, 472, 1280, 524), 8, "#fff5f5", "#b91c1c", 3)
    text(draw, (720, 532), "Selecione uma categoria.", 17, "#b91c1c", True)
    input_box(draw, 114, 592, 560, "Responsável *")
    rounded(draw, (114, 626, 674, 678), 8, "#fff5f5", "#b91c1c", 3)
    text(draw, (114, 686), "Informe o responsável.", 17, "#b91c1c", True)
    input_box(draw, 720, 592, 560, "Descrição curta *")
    rounded(draw, (720, 626, 1280, 724), 8, "#fff5f5", "#b91c1c", 3)
    text(draw, (720, 732), "Digite uma descrição.", 17, "#b91c1c", True)
    button(draw, 114, 790, 210, "Adicionar item")
    img.save(ASSETS / "tela-validacao.png", quality=95)


def styles():
    sample = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "Title",
            parent=sample["Title"],
            fontName="Helvetica-Bold",
            fontSize=28,
            leading=34,
            textColor=colors.HexColor("#115e59"),
            alignment=TA_CENTER,
            spaceAfter=24,
        ),
        "h1": ParagraphStyle(
            "H1",
            parent=sample["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=17,
            leading=22,
            textColor=colors.HexColor("#115e59"),
            spaceBefore=8,
            spaceAfter=10,
        ),
        "h2": ParagraphStyle(
            "H2",
            parent=sample["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12.5,
            leading=16,
            textColor=colors.HexColor("#263641"),
            spaceBefore=8,
            spaceAfter=5,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            alignment=TA_LEFT,
            spaceAfter=7,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=8.7,
            leading=11.5,
            textColor=colors.HexColor("#5d6975"),
        ),
    }


def para(text_value, style):
    return Paragraph(text_value.replace("\n", " "), style)


def table(rows, widths, style):
    data = [[para(cell, style) for cell in row] for row in rows]
    result = Table(data, colWidths=widths, hAlign="LEFT", repeatRows=1)
    result.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e9f7f4")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#115e59")),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("GRID", (0, 0), (-1, -1), 0.45, colors.HexColor("#d7dee5")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return result


def bullets(items, style):
    return ListFlowable(
        [ListItem(para(item, style), leftIndent=12) for item in items],
        bulletType="bullet",
        leftIndent=18,
        bulletFontSize=7,
    )


def numbered(items, style):
    return ListFlowable(
        [ListItem(para(item, style), leftIndent=12) for item in items],
        bulletType="1",
        start="1",
        leftIndent=20,
    )


def add_image(story, filename, caption, st):
    story.append(PdfImage(str(ASSETS / filename), width=17.2 * cm, height=11.45 * cm))
    story.append(para(caption, st["small"]))
    story.append(Spacer(1, 8))


def build_pdf():
    st = styles()
    doc = SimpleDocTemplate(
        str(PDF_PATH),
        pagesize=A4,
        rightMargin=1.5 * cm,
        leftMargin=1.5 * cm,
        topMargin=1.35 * cm,
        bottomMargin=1.35 * cm,
        title="Documentação - Feira Digital de Trocas",
        author="Jeová",
    )
    story = []

    story.append(Spacer(1, 4.6 * cm))
    story.append(para("Primeira Documentação de um Projeto de Software", st["title"]))
    story.append(Spacer(1, 1.1 * cm))
    for line in [
        "Instituição: SENAC",
        "Unidade curricular: Desenvolvimento Web",
        "Projeto: Feira Digital de Trocas",
        "Aluno(a): Jeová",
        "Turma: Preencher com a turma",
        "Data: 30 de agosto de 2026",
    ]:
        story.append(para(line, st["body"]))
    story.append(PageBreak())

    story.append(para("1. Pesquisa sobre documentação de software", st["h1"]))
    for heading, body in [
        ("O que é documentação de software?", "Documentação de software é o conjunto de textos, imagens, tabelas, explicações e registros que ajudam uma pessoa a entender um sistema. Ela não substitui o código-fonte, mas explica o objetivo do projeto, sua organização, as tecnologias usadas, os dados tratados e as interações disponíveis."),
        ("Para que serve?", "Serve para orientar o uso, facilitar a manutenção, registrar decisões e permitir que outras pessoas compreendam o projeto sem depender apenas da leitura direta do código."),
        ("Por que documentar um projeto?", "Um projeto documentado fica mais fácil de apresentar, testar, corrigir e evoluir. Sem documentação, pequenas alterações podem demorar mais porque é necessário descobrir sozinho a função de cada arquivo e cada regra."),
        ("Quem utiliza?", "Estudantes, professores, usuários, desenvolvedores, avaliadores e qualquer pessoa que precise entender a aplicação. Cada público procura informações diferentes."),
        ("Existe apenas um tipo?", "Não. Há guias de uso, tutoriais, documentação técnica, referência, explicação e registros de decisão. O modelo Diátaxis organiza essas necessidades em aprender, executar, consultar e entender."),
    ]:
        story.append(para(heading, st["h2"]))
        story.append(para(body, st["body"]))

    story.append(para("2. Elementos importantes", st["h1"]))
    story.append(
        table(
            [
                ["Elemento", "Para que serve", "Informações que podem aparecer"],
                ["Capa", "Identifica o trabalho.", "Instituição, unidade curricular, projeto, aluno, turma e data."],
                ["Apresentação", "Explica o projeto e o problema.", "Objetivo, contexto, público-alvo e solução."],
                ["Tecnologias", "Mostra recursos técnicos usados.", "HTML, CSS, JavaScript, DOM, eventos, JSON e Local Storage."],
                ["Funcionalidades", "Registra o que existe no sistema.", "Cadastro, validação, filtros, reserva, exclusão e persistência."],
                ["Dados", "Explica informações manipuladas.", "Campos do item, identificador, situação, data e chave de armazenamento."],
                ["Telas", "Facilita a leitura visual.", "Capturas, títulos, legendas e ações possíveis."],
                ["Eventos", "Mostra como o usuário aciona o sistema.", "Submit, click, input, change, reset e keydown."],
                ["Referências", "Dá crédito às fontes.", "Links e assunto pesquisado."],
            ],
            [3.0 * cm, 5.3 * cm, 8.4 * cm],
            st["small"],
        )
    )

    story.append(para("3. Boas práticas para entrega de uma documentação", st["h1"]))
    story.append(
        numbered(
            [
                "Organizar títulos e subtítulos para criar uma sequência de leitura.",
                "Usar linguagem clara e escrever com palavras próprias.",
                "Inserir imagens com título, legenda e explicação.",
                "Utilizar tabelas quando elas ajudarem a comparar informações.",
                "Manter fidelidade ao projeto e não inventar funcionalidades.",
                "Registrar referências das fontes consultadas.",
                "Revisar ortografia, organização visual e funcionamento do PDF.",
                "Nomear o arquivo no padrão solicitado pela atividade.",
            ],
            st["body"],
        )
    )

    story.append(PageBreak())
    story.append(para("4. Apresentação do projeto", st["h1"]))
    story.append(para("A aplicação Feira Digital de Trocas é uma página web criada para cadastrar objetos que podem ser trocados ou doados. Ela organiza uma pequena feira comunitária diretamente no navegador, sem banco de dados externo.", st["body"]))
    story.append(
        table(
            [
                ["Item", "Descrição"],
                ["Objetivo", "Facilitar o cadastro, consulta e reserva de itens disponíveis para troca ou doação."],
                ["Problema", "Evitar que informações da feira se percam em conversas ou anotações soltas."],
                ["Público-alvo", "Estudantes, professores, turmas e comunidades escolares."],
                ["Arquivos", "index.html, style.css e script.js."],
            ],
            [4 * cm, 12.7 * cm],
            st["small"],
        )
    )

    story.append(para("5. Tecnologias utilizadas", st["h1"]))
    story.append(
        table(
            [
                ["Tecnologia", "Uso no projeto"],
                ["HTML", "Estrutura cabeçalho, formulário, resumo, filtros, lista de itens e rodapé."],
                ["CSS", "Define layout responsivo, cores, cartões, estados de validação e botões."],
                ["JavaScript", "Controla cadastro, validação, filtros, reserva, exclusão, mensagens e resumo."],
                ["DOM", "Busca elementos, altera textos e cria cartões dinamicamente."],
                ["Eventos", "Conectam ações do usuário ao sistema."],
                ["Local Storage", "Salva os itens no navegador com a chave feira-digital-itens."],
                ["JSON", "Converte objetos em texto para salvar e recuperar os dados."],
            ],
            [4 * cm, 12.7 * cm],
            st["small"],
        )
    )

    story.append(para("6. Funcionalidades desenvolvidas", st["h1"]))
    story.append(
        table(
            [
                ["Funcionalidade", "Como usa", "Resultado", "Recursos"],
                ["Cadastro", "Preenche e envia o formulário.", "Cria e salva um cartão.", "Formulário, JS, DOM, Local Storage."],
                ["Validação", "Tenta cadastrar dados incompletos ou repetidos.", "Mostra erros nos campos.", "Funções, CSS e mensagens."],
                ["Exemplos", "Clica em Carregar exemplos.", "Adiciona itens de teste sem duplicar.", "Array e verificação."],
                ["Resumo", "Realiza alterações na lista.", "Atualiza totais automaticamente.", "Filtros e DOM."],
                ["Pesquisa e filtros", "Digita busca e escolhe opções.", "Mostra apenas itens compatíveis.", "Input, change e renderização."],
                ["Reserva", "Clica em Reservar item.", "Muda situação para reservado.", "Delegação de clique."],
                ["Disponibilizar", "Clica no botão do item reservado.", "Volta para disponível.", "Atualização de estado."],
                ["Exclusão", "Clica em Excluir e confirma.", "Remove o item.", "Confirm, array e storage."],
                ["Atalhos", "Usa / ou Esc.", "Foca ou limpa a busca.", "keydown."],
            ],
            [3.5 * cm, 4.4 * cm, 4.3 * cm, 4.5 * cm],
            st["small"],
        )
    )

    story.append(PageBreak())
    story.append(para("7. Dados utilizados e armazenamento", st["h1"]))
    story.append(para("Cada item cadastrado é representado por um objeto JavaScript com informações digitadas pelo usuário e dados criados automaticamente pelo sistema.", st["body"]))
    story.append(
        table(
            [
                ["Campo", "Finalidade"],
                ["id", "Identifica cada item de forma única."],
                ["nome", "Nome do objeto cadastrado."],
                ["categoria", "Grupo do item."],
                ["estado", "Estado de conservação."],
                ["tipo", "Troca ou doação."],
                ["responsavel", "Pessoa responsável pelo item."],
                ["descricao", "Detalhes importantes do objeto."],
                ["situacao", "Disponível ou reservado."],
                ["criadoEm", "Data e horário do cadastro."],
            ],
            [4 * cm, 12.7 * cm],
            st["small"],
        )
    )
    story.append(para("Um novo item é criado quando o usuário envia o formulário com dados válidos. Ao reservar ou disponibilizar, o campo situação é alterado. Ao excluir, o item é retirado do array. O Local Storage guarda os dados no navegador usando JSON, por isso a lista permanece após atualizar a página.", st["body"]))

    story.append(para("8. Telas da aplicação", st["h1"]))
    add_image(story, "tela-cadastro-resumo.png", "Figura 1 - Área inicial com cabeçalho, formulário de cadastro e resumo automático.", st)
    story.append(PageBreak())
    add_image(story, "tela-filtros-lista.png", "Figura 2 - Pesquisa, filtros e cartões de itens cadastrados.", st)
    add_image(story, "tela-validacao.png", "Figura 3 - Validação do formulário com mensagem geral e erros nos campos.", st)

    story.append(PageBreak())
    story.append(para("9. Eventos e interações", st["h1"]))
    story.append(
        table(
            [
                ["Evento", "Onde é usado", "Ação", "Resultado"],
                ["DOMContentLoaded", "Documento", "Página carrega.", "Inicializa elementos, dados e eventos."],
                ["submit", "Formulário", "Adicionar item.", "Valida e cadastra."],
                ["reset", "Formulário", "Limpar formulário.", "Remove avisos e atualiza contador."],
                ["click", "Exemplos e lista", "Clica em botões.", "Carrega exemplos, reserva, disponibiliza ou exclui."],
                ["input", "Busca e descrição", "Digita texto.", "Filtra lista ou atualiza contador."],
                ["change", "Filtros", "Seleciona opção.", "Recalcula cartões exibidos."],
                ["keydown", "Documento", "Pressiona / ou Esc.", "Foca ou limpa a busca."],
            ],
            [3.2 * cm, 3.9 * cm, 4.2 * cm, 5.4 * cm],
            st["small"],
        )
    )

    story.append(para("10. Funcionamento básico", st["h1"]))
    story.append(
        numbered(
            [
                "O usuário acessa a página da Feira Digital de Trocas.",
                "O JavaScript carrega itens salvos no Local Storage.",
                "O usuário preenche o formulário.",
                "O sistema valida campos obrigatórios e duplicidade.",
                "Se houver erro, mostra mensagens e foca o primeiro campo com problema.",
                "Se estiver correto, cria um objeto com id, situação e data.",
                "O item é salvo no array e gravado no Local Storage.",
                "A lista e o resumo são atualizados.",
                "O usuário pesquisa, filtra, reserva, disponibiliza ou exclui itens.",
                "Depois de cada alteração, o sistema salva novamente e mostra confirmação.",
            ],
            st["body"],
        )
    )

    story.append(para("11. Dificuldades, soluções e melhorias futuras", st["h1"]))
    story.append(para("Uma dificuldade importante foi manter a lista atualizada em todos os pontos da aplicação. Quando um item é cadastrado, reservado ou excluído, também é necessário atualizar a tela, recalcular o resumo e salvar no Local Storage.", st["body"]))
    story.append(para("A solução foi separar o código em funções com responsabilidades específicas, como salvarItens, aplicarPesquisaEFiltros, renderizarItens e atualizarResumo. O carregamento usa try...catch para evitar quebra com dados inválidos e normaliza itens antigos.", st["body"]))
    story.append(bullets(["Permitir editar itens.", "Adicionar imagem do objeto.", "Criar filtro por responsável.", "Exportar a lista.", "Adicionar modo de impressão da lista."], st["body"]))

    story.append(para("12. Conclusão", st["h1"]))
    story.append(para("Produzir esta documentação mostrou que desenvolver um projeto não é apenas escrever código. Também é necessário explicar problema, funcionamento, tecnologias, dados e decisões. A documentação facilita apresentação, manutenção e futuras melhorias.", st["body"]))

    story.append(para("13. Referências", st["h1"]))
    story.append(
        bullets(
            [
                "MDN Web Docs - Web Storage API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API",
                "MDN Web Docs - Document Object Model: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
                "MDN Web Docs - DOM events: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events",
                "MDN Web Docs - Client-side form validation: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation",
                "Write the Docs - Software documentation guide: https://www.writethedocs.org/guide/",
                "Diátaxis - Documentation framework: https://diataxis.fr/",
                "Google for Developers - Documentation style guide: https://developers.google.com/style/",
            ],
            st["body"],
        )
    )

    doc.build(story)


def main():
    ASSETS.mkdir(exist_ok=True)
    screenshot_cadastro()
    screenshot_filtros_lista()
    screenshot_validacao()
    build_pdf()
    print(PDF_PATH)


if __name__ == "__main__":
    main()
