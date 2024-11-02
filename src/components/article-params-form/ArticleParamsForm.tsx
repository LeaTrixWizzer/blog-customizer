import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsFormProps = {
	setArticleState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setArticleState } = props;
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isOpened, setIsOpened] = useState<boolean>(false);

	const submitForm = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setArticleState(formState);
		setIsOpened(false);
	};

	const resetForm = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	const changeForm = (fieldName: string) => {
		return (value: OptionType) => {
			setFormState((currentFormState) => ({
				...currentFormState,
				[fieldName]: value,
			}));
		};
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpened}
				onClick={() => setIsOpened((currentIsOpened) => !currentIsOpened)}
			/>
			<div
				onClick={() => setIsOpened(false)}
				className={clsx(styles.overlay, isOpened && styles.overlay_open)}></div>
			<aside
				onClick={() => setIsOpened(true)}
				className={clsx(styles.container, isOpened && styles.container_open)}>
				<form onSubmit={submitForm} onReset={resetForm} className={styles.form}>
					<Text as={'h2'} size={31} weight={800} align='center' uppercase>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={changeForm('fontFamilyOption')}
					/>
					<RadioGroup
						title='рАЗМЕР шрифта'
						name='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={changeForm('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={changeForm('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={changeForm('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={changeForm('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							// onClick={() => {}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
